import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

const BACKEND_URL = process.env.VITE_API_URL;
const SITE_URL = 'https://jina-commerce.vercel.app';

if (!BACKEND_URL) {
  console.error('❌ Error: VITE_API_URL is not defined in .env.production');
  process.exit(1);
}

// Fetch with timeout
async function fetchWithTimeout(url, timeout = 90000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function generateSitemap() {
  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/products', changefreq: 'daily', priority: 0.9 },
    { url: '/order', changefreq: 'weekly', priority: 0.6 },
  ];

  try {
    const productsEndpoint = `${BACKEND_URL}/products`;
    
    console.log(`🔄 Fetching products from: ${productsEndpoint}`);
    console.log('⏳ This may take up to 60s if Render app is sleeping...\n');
    
    const response = await fetchWithTimeout(productsEndpoint, 90000); // 90 second timeout
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API returned ${response.status}: ${response.statusText}\n` +
        `Response: ${errorText.substring(0, 200)}`
      );
    }
    
    const data = await response.json();
    const products = Array.isArray(data) ? data : data.products || data.data || [];
    
    if (!products.length) {
      console.warn('⚠️  No products found. Generating sitemap with static pages only.');
    } else {
      console.log(`✅ Fetched ${products.length} products`);
    }
    
    const categories = new Set();
    const categorySubcategories = new Map();
    
    products.forEach(product => {
      const category = product.category;
      const subCategory = product.subCategory;
      
      if (category) {
        categories.add(category);
        
        if (subCategory) {
          if (!categorySubcategories.has(category)) {
            categorySubcategories.set(category, new Set());
          }
          categorySubcategories.get(category).add(subCategory);
        }
      }
      
      let productUrl;
      if (subCategory) {
        productUrl = `/products/${category}/${subCategory}/preview/${product._id}`;
      } else {
        productUrl = `/products/${category}/preview/${product._id}`;
      }
      
      pages.push({
        url: productUrl,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: product.updatedAt || new Date().toISOString()
      });
    });
    
    categories.forEach(category => {
      pages.push({
        url: `/products/${category}`,
        changefreq: 'weekly',
        priority: 0.8
      });
    });
    
    categorySubcategories.forEach((subcategories, category) => {
      subcategories.forEach(subCategory => {
        pages.push({
          url: `/products/${category}/${subCategory}`,
          changefreq: 'weekly',
          priority: 0.75
        });
      });
    });
    
    // Generate sitemap
    const stream = new SitemapStream({ hostname: SITE_URL });
    const xml = await streamToPromise(
      Readable.from(pages).pipe(stream)
    ).then((data) => data.toString());
    
    fs.writeFileSync('./public/sitemap.xml', xml);
    
    console.log('\n✅ Sitemap generated successfully!');
    console.log(`   📄 Total URLs: ${pages.length}`);
    console.log(`   📦 Products: ${products.length}`);
    console.log(`   📂 Categories: ${categories.size}`);
    const subCatCount = Array.from(categorySubcategories.values()).reduce((sum, set) => sum + set.size, 0);
    if (subCatCount > 0) {
      console.log(`   📁 Subcategories: ${subCatCount}`);
    }
    console.log(`   📍 Saved to: public/sitemap.xml\n`);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Request timeout: Render server took too long to respond');
      console.error('   This usually means the free tier app is sleeping.');
      console.error('   Try running the script again in a minute.\n');
    } else {
      console.error('❌ Error generating sitemap:', error.message);
    }
    
    console.error('🔍 Troubleshooting:');
    console.error(`   1. Visit: ${BACKEND_URL}/products in browser`);
    console.error(`   2. Wait for Render to wake up (30-60s)`);
    console.error(`   3. Run script again: npm run generate-sitemap\n`);
    process.exit(1);
  }
}

generateSitemap();