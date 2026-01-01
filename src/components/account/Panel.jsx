import { PanelContext } from "../../context/PanelContext.jsx";
import { useContext, useState } from "react";
import NotFound from "../NotFound.jsx";
import searchImg from "../../assets/search.png"
import { NavLink } from "react-router-dom";
const Panel = () => {
  const { panel, total, removeItem, updateQty } = useContext(PanelContext);
  const formatPrice = (price) => `${price.toLocaleString()},000 DT`;

  const handleQtyDecrease = (id, currentQty) => {
    if (currentQty > 1) updateQty(id, currentQty - 1);
  };

  const handleQtyIncrease = (id, currentQty) => {
    updateQty(id, currentQty + 1);
  };

  const handleQtyChange = (id, e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      updateQty(id, value);
    }
  };

  const handleDelete = (_id) => {
    removeItem(_id);
  };

  return (
    <> {
      panel.length>0?(
      <div id="panel-container">
      <table className="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {panel.map((item) => (
          <tr key={item._id}>
            <td className="product-td">
              <img src={item.pictures[0]} />
              <div>
                <h5>{item.name}</h5>
                <p>{item.reference}</p>
              </div>
            </td>
            <td className="info-td">{formatPrice(item.price || 0)}</td>
            <td className="info-td">
              <div className="panel-qty-control">
                <div
                  className="decrease-qty"
                  onClick={() => handleQtyDecrease(item._id, item.purchaseQty)}
                ></div>
                <input
                  type="number"
                  name="number"
                  className="panel-item-quantity"
                  value={item.purchaseQty}
                  onChange={(e) => handleQtyChange(item._id, e)}
                  min="1"
                />
                <div
                  className="increase-qty"
                  onClick={() => handleQtyIncrease(item._id, item.purchaseQty)}
                ></div>
              </div>
            </td>
            <td className="info-td">
              {formatPrice((item.price || 0) * (item.purchaseQty || 1))}
            </td>
            <td>
              <button
                aria-label="Delete item"
                className="panel-delete-button"
                onClick={() => handleDelete(item._id)}
              >
                <svg
                  className="trash-svg"
                  viewBox="0 -10 64 74"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="trash-can">
                    <rect
                      x="16"
                      y="24"
                      width="32"
                      height="30"
                      rx="3"
                      ry="3"
                      fill="#000"
                    ></rect>

                    <g transformOrigin="12 18" id="lid-group">
                      <rect
                        x="12"
                        y="12"
                        width="40"
                        height="6"
                        rx="2"
                        ry="2"
                        fill="#000"
                      ></rect>
                      <rect
                        x="26"
                        y="8"
                        width="12"
                        height="4"
                        rx="2"
                        ry="2"
                        fill="#000"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="grand-total">
          <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
            Total TTC
          </td>
          <td style={{ fontWeight: "bold", color: "red" }}>
            {formatPrice(total)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <NavLink to="/order">
<button className="order-now">Order Now</button>
    </NavLink>
    
    </div>
  ):(
      <NotFound img={searchImg} message={"Empty Panel"}/>
    )
    }
    
    </>
    
  );
};

export default Panel;
