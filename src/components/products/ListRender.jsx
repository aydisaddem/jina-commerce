import ItemCarousel from "./itemCarousel";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { brands } from "../../data/brands";

const ListRender = ({
  paginatedProducts,
  handleAddToPanel,
  handleWishlist,
}) => {
  return (
    <div className="wbList">
      {paginatedProducts.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-picture-container">
            <ItemCarousel pictures={item.pictures} name={item.name} />{" "}
          </div>
          <div className="item-description">
            <Link
              to={`/products/${slugify(item.category)}${
                item.subCategory && item.subCategory !== item.category
                  ? `/${slugify(item.subCategory)}`
                  : ""
              }/preview/${item._id}`}
              style={{ all: "unset" }}
            >
              <h3>{item.name}</h3>
              <p>
                {item.reference}
                <br />

                {item.description}
              </p>
            </Link>
          </div>
          <div className="item-status-bar">
            <Link to={`brands/${item.brand}`}>
              <img src={brands[item.brand]} className="brand-logo" loading="lazy" alt={item.brand}/>
            </Link>
            <span className="item-price">{item.price},000 DT</span>
            <span
              className={`item-stock ${
                item.quantity ? "in-stock" : "on-order"
              }`}
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
              ) : (
                ""
              )}

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

export default ListRender;
