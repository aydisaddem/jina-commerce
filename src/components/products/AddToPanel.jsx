import "../../styles/products.css";
import { useContext } from "react";
import { PanelContext } from "../../context/PanelContext.jsx";
import { Link } from "react-router-dom";
import { cloudinaryOptimize } from "../../utils/cloudinaryOptimize.js";

const AddToPanel = ({ data, showCart, qty }) => {
  const { total, count } = useContext(PanelContext);
  const isLCP = false;

  return (
    <div className="cart-confirmation-panel">
      <p className="successCartMsg">Product successfully added to panel</p>
      {data && (
        <div className="cart-product-details">
          <div className="product-image-wrapper">
            <img
              src={cloudinaryOptimize(data.pictures?.[0], 400)}
              srcSet={`
      ${cloudinaryOptimize(data.pictures?.[0], 200)} 200w,
      ${cloudinaryOptimize(data.pictures?.[0], 400)} 400w,
      ${cloudinaryOptimize(data.pictures?.[0], 600)} 600w
    `}
              sizes="(max-width: 768px) 100vw, 400px"
              alt={data.name}
              width="400"
              height="400"
              className="item-picture"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="product-info-block">
            <h6>{data.name}</h6>
            <p className="cartItem-reference">[{data.reference}]</p>
            <p className="cartItem-price">{data.price},000 DT</p>
            <p className="cartItem-qty">QTY: {qty}</p>
          </div>
        </div>
      )}
      <hr />
      <p className="panel-length">
        <i className="fa-solid fa-basket-shopping"></i> There are {count} items
        in your cart.
      </p>
      <div className="total-Panel">
        <p>TOTAL:</p>
        <p>{total},000 DT TTC</p>
      </div>
      <div className="confirm-buttons">
        <button onClick={showCart}>continue shopping</button>

        <button>
          <Link to="/account/panel" style={{ all: "unset" }}>
            order now
          </Link>
        </button>
      </div>
      <button className="close-cart" onClick={showCart}>
        ✕
      </button>
    </div>
  );
};
export default AddToPanel;
