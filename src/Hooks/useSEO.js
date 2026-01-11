import { useEffect } from 'react';

export function useSEO({ 
  title, 
  description, 
  canonical, 
  image,
  type = 'website' 
}) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, attribute, value) => {
      if (!value) return;
      
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        
        // Extract the attribute name and value from selector
        const match = selector.match(/\[(.*?)="(.*?)"\]/);
        if (match) {
          const [, attrName, attrValue] = match;
          element.setAttribute(attrName, attrValue);
        }
        
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Update meta description
    updateMetaTag('meta[name="description"]', 'content', description);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:url"]', 'content', canonical);
    if (image) {
      updateMetaTag('meta[property="og:image"]', 'content', image);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', 'content', image);
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
  }, [title, description, canonical, image, type]);
}