import "../../styles/products.css";
import ItemCarousel from "./itemCarousel";
import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { brands } from "../../data/brands";
import { AuthContext } from "../../context/AuthContext.jsx";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
    const { isLoggedIn} = useContext(AuthContext);
  console.log(isLoggedIn)

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
  const handleAlert = () =>{
        setIsHidden(!isHidden);

  }
  const handleWishlist =()=>{
   if (!isLoggedIn) {
      handleAlert()
    } 
    console.log('test')
  }

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
  <span className={`item-stock ${item.quantity ? "in-stock" : "on-order"}`}>{
    item.quantity? "In stock" : "On order"
    }</span>
  <div className="item-actions">
    <button className="icon-button"><i className="fa-solid fa-cart-shopping"></i></button>
    <button className="icon-button" onClick={handleWishlist}><i className="fa-regular fa-heart"></i></button>
  </div>
</div>
        </div>
      ))}
      <div className={`overlay ${isHidden? "hidden" : ""}`} onClick={handleAlert}></div>
 <div className={`auth-alert ${isHidden? "hidden" : ""}`}>
  {!isLoggedIn ? ( <>
  <p>You must be logged in to manage your list </p>
  <span onClick={handleAlert}><i className="fa-solid fa-xmark"></i></span>
  </>
  ): (
    <>
    <p>The product has been added to your list. View your list. </p>
  <span onClick={handleAlert}><i className="fa-solid fa-xmark"></i></span>
    </>
  )}

 </div>
     
    </div>
  );
};

export default Products;
