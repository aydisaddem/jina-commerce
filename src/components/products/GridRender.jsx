import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { brands } from "../../data/brands";
import ItemCarousel from "./itemCarousel";

const GridRender = ({ paginatedProducts, handleAddToPanel, handleWishlist }) => {
  return (
    <div className="wbGrid">
      {paginatedProducts.map((item) => (
        <div key={item._id} className="grid-card">
          <div className="grid-picture">
            <ItemCarousel pictures={item.pictures} name={item.name} />
          </div>
          <div className="grid-details">
          <Link
            to={`/products/${slugify(item.category)}${
              item.subCategory && item.subCategory !== item.category
                ? `/${slugify(item.subCategory)}`
                : ""
            }/preview/${item._id}`}
            style={{ all: "unset" }}
          >
            <h3>{item.name}</h3>
            <p>{item.reference}</p>
          </Link>
          <Link to={`brands/${item.brand}`}>
              <img src={brands[item.brand]} alt={item.brand} className="grid-brandLogo" loading="lazy" />
          </Link>
              
          <span className="grid-item-price">{item.price},000 DT</span>
          <span
            className={`${item.quantity ? "in-stock" : "on-order"}`}
          >
            {item.quantity ? "In stock" : "On order"}
          </span>
              <div className="item-actions">
            {item.quantity ? (
              <button
                className="icon-button"
                onClick={() => handleAddToPanel(item)}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            ) : null}
            <button
              className="icon-button"
              onClick={() => handleWishlist(item)}
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
          </div>
          

      
        </div>
      ))}
    </div>
  );
};

export default GridRender;
