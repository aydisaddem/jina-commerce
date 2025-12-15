import "../../styles/products.css";
import ItemCarousel from "./itemCarousel";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import api from "../../utils/api";
import { brands } from "../../data/brands";
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanelContext } from "../../context/PanelContext.jsx";
import AddToPanel from "./addToPanel.jsx";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [newPanelShow, setNewPanelShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isLoggedIn, user, setUser } = useContext(AuthContext);
  const { addItem } = useContext(PanelContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAlert = () => {
    setIsHidden(!isHidden);
  };
  const handleWishlist = async (item) => {
    if (!user || !user._id) {
      handleAlert();
      return;
    }
    const userId = user._id;
    try {
      const response = await api.put(`/users/${userId}/addToWishlist`, {
        id: item._id,
        name: item.name,
        reference: item.reference,
        picture: item.pictures[0],
        price: item.price,
      });
      setUser(response.data);
      handleAlert();
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
    handleAlert();
  };
  const showCart = () => {
    setNewPanelShow(!newPanelShow);
  };

  const handleAddToPanel = (item) => {
  const updatedItem = addItem(item);
  setSelectedItem(updatedItem);
  showCart();
};

  return (
    <div className="products-container">
      {products.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-picture-container">
            <ItemCarousel pictures={item.pictures} name={item.name} />{" "}
          </div>
          <div className="item-description">
            <h3>{item.name}</h3>
            <p>
              {item.reference}
              <br />
              {item.description}
            </p>
          </div>
          <div className="item-status-bar">
            <img src={brands[item.brand]} className="brand-logo" />

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
      <div
        className={`overlay ${isHidden ? "hidden" : ""}`}
        onClick={handleAlert}
      ></div>
      <div className={`auth-alert ${isHidden ? "hidden" : ""}`}>
        {!isLoggedIn ? (
          <>
            <p>You must be logged in to manage your list </p>
            <span onClick={handleAlert}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </>
        ) : (
          <>
            <p>The product has been added to your list. <NavLink to="/account/wishlist"><strong>View your list</strong></NavLink>. </p>
            <span onClick={handleAlert}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </>
        )}
      </div>
      <div className={`${!newPanelShow ? "hidden" : ""} overlay`}>
        <AddToPanel data={selectedItem} showCart={showCart} qty={1}/>
      </div>
    </div>
  );
};

export default Products;
