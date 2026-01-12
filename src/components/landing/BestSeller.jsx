import { brands } from "../../data/brands";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { cloudinaryOptimize } from "../../utils/cloudinaryOptimize";
const BestSeller = () => {
  const bestSeller = [
    {
      id: "693fda658823f3ca51bb6dda",
      picture:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1765792263/Jina/sx2tqxkqspv5bmdrne0d.jpg",
      name: "ASUS TUF Gaming A15 Gaming Laptop",
      reference: "FA506NF-HN004",
      category: "Laptops",
      subCategory: "Gaming Laptop",
      logo: brands.ASUS,
      price: "2079",
    },
    {
      id: "69451aef0b75f2b0f2ca3c20",
      picture:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766136458/Jina/iv58aimkz9i1r5xnqc17.jpg",
      name: "Headset with Microphone JBL Quantum",
      reference: "96973",
      category: "Accessories",
      subCategory: "Headsets & Earphones",
      logo: brands.JBL,
      price: "989",
    },
    {
      id: "6949a54a163fffe31f131380",
      picture:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766434111/Jina/qzza7fni53ye9kx9tuu1.png",
      name: "USB Webcam White Shark OWL Full HD",
      reference: "GWC-004",
      category: "Accessories",
      subCategory: "Webcams",
      logo: brands["WHITE SHARK"],
      price: "80",
    },
    {
      id: "693fd81d8823f3ca51bb6add",
      picture:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1765791566/Jina/npbppmeecdjg0fxybcv3.png",
      name: "Gaming Laptop MSI Thin 15 B13U",
      reference: "B13UCX-2607XFR-SS",
      category: "Laptops",
      subCategory: "Gaming Laptop",
      logo: brands.MSI,
      price: "2025",
    },
  ];

  return (
    <div className="bestSeller-section">
      <div className="bestSeller-header">
        <h2>Our Best Sellers</h2>
        <Link to="/products" className="view-all-link">
          View All Products &gt;
        </Link>
      </div>

      <div id="bestSeller-container">
        {bestSeller.map((product) => (
          <div key={product.id} className="bestSeller-card">
            <Link
              to={`/products/${slugify(product.category)}/${slugify(
                product.subCategory
              )}/preview/${product.id}`}
              className="bestSeller-link"
            >
              <div className="bestSeller-img-container">
                <img
    src={cloudinaryOptimize(product.picture, 300)}
    srcSet={`
      ${cloudinaryOptimize(product.picture, 300)} 1x,
      ${cloudinaryOptimize(product.picture, 600)} 2x
    `}
    alt={product.name}
    className="bestSeller-img"
    loading="lazy"
    decoding="async"
  />
              </div>
 {" "}
              <div className="bestSeller-info">
                <div className="bestSeller-logo-container">
  <img 
    width="80" 
    height="auto"
    alt={product.name + " logo"} 
    className="bestSeller-logo" 
    loading="lazy" 
    decoding="async" 
    src={cloudinaryOptimize(product.logo, 80)}
    srcSet={`
      ${cloudinaryOptimize(product.logo, 80)} 1x,
      ${cloudinaryOptimize(product.logo, 160)} 2x
    `}
  />
                </div>
               
                <h3>{product.name}</h3>
                <p>Ref: {product.reference}</p>
                <p className="bestSeller-price">{product.price},000 DT</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
