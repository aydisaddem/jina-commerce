import "../../styles/productPreview.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../Loading";
import { brands } from "../../data/brands";
import { PanelContext } from "../../context/PanelContext.jsx";
import AddToPanel from "./AddToPanel.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Breadcrumb from "../layout/Breadcrumb.jsx";
import NotFound from "../NotFound.jsx";
import block from "../../assets/block.png"
import { useSEO } from '../../Hooks/useSEO.js';

const ProductPreview = () => {
  const { addItem } = useContext(PanelContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newPanelShow, setNewPanelShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { isLoggedIn, user, setUser } = useContext(AuthContext);

  const {category, subCategory, id } = useParams();

useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get(`/products/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("failed to fetch Data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


 // Build canonical URL based on whether subcategory exists
  let canonical;
  if (subCategory) {
    // URL: /products/:category/:subCategory/preview/:id
    canonical = `https://jinashop.netlify.app/products/${category}/${subCategory}/preview/${id}`;
  } else {
    // URL: /products/:category/preview/:id
    canonical = `https://jinashop.netlify.app/products/${category}/preview/${id}`;
  }
  
  // Apply SEO
  useSEO({
    title: `${data.name} - Buy at JINA SHOP Tunisia`,
    description: `${data.name} - ${data.description?.substring(0, 150) || 'High quality electronics'}. Buy online with home delivery in Tunisia. Pay on delivery available.`,
    canonical: canonical,
    image:  data.pictures?.[0],
    type: 'product'
  });


  if (loading) return <Loading />;
  if (error)
    return (
      <NotFound img= {block} message={"Product doesn't exist or was removed"} />
    );

  const handleQtyDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleQtyIncrease = () => {
    setQty(qty + 1);
  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQty(value);
    }
  };

  const showCart = () => {
    setNewPanelShow(!newPanelShow);
  };

  const handleAddToPanel = (qty) => {
    showCart();
    addItem(data, qty);
  };

  const handleAlert = () => {
    setIsHidden(!isHidden);
  };
  const handleWishlist = async () => {
    if (!user || !user._id) {
      handleAlert();
      return;
    }
    const userId = user._id;
    try {
      const response = await api.put(`/users/${userId}/addToWishlist`, {
        id: data._id,
        name: data.name,
        reference: data.reference,
        category: data.category,
        picture: data.pictures[0],
        price: data.price,
      });
      setUser(response.data);
      handleAlert();
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
    handleAlert();
  };

  return (
    <>
    <h1 className="visually-hidden">
        Product Preview
      </h1>
    <Breadcrumb data={data}/>
    <div id="product-container">

      
      <div className="product-name">
        <h2>{data.name}</h2>
      </div>
      <hr />
      <div className="product-info">
        <div className="carousel">
          <div className="main-image">
            <img
              src={data.pictures[activeIndex]}
              alt={`Product view ${activeIndex + 1}`}
            />

            <button
              className="bg-arrow leftSide"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? data.pictures.length - 1 : prev - 1
                )
              }
            >
              &#10094;
            </button>

            <button
              className="bg-arrow rightSide"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === data.pictures.length - 1 ? 0 : prev + 1
                )
              }
            >
              &#10095;
            </button>
          </div>

          <div className="thumbnails">
            {data.pictures.map((img, index) => (
              <button
                key={index}
                className={`thumb ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy"/>
              </button>
            ))}
          </div>
        </div>
        <div className="details-container">
          <div className="product-desc">
            <p className="item-reference">
              Reference : <span> {data.reference} </span>{" "}
            </p>
            <p>{data.description}</p>
          </div>
          <div className="purshase-container">
            <img
              className="brand-logo"
              src={brands[data.brand]}
              alt={data.brand}
              loading="lazy"
            />
            <p className="item-price">{data.price},000 DT TTC</p>
            <p className="item-availability">
              Availability :{" "}
              <span className={data.quantity ? "in-stock" : "on-order"}>
                {data.quantity ? "In stock" : "On order"}
              </span>
            </p>
            <div className="number-control">
              <span className="item-quantity">Quantity :</span>
              <div className="number-left" onClick={handleQtyDecrease}></div>
              <input
                type="number"
                name="number"
                value={qty}
                onChange={(e) => handleQtyChange(e)}
                className="number-quantity"
              />
              <div className="number-right" onClick={handleQtyIncrease}></div>
            </div>
            <div className="item-actions">
              {data.quantity ? (
                <button
                  className="icon-button"
                  onClick={() => handleAddToPanel(qty)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              ) : (
                ""
              )}

              <button className="icon-button" onClick={handleWishlist}>
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {data.specifications.length>0 &&  <div className="product-specifications">
        <h3>technical sheet</h3>
        <table className="spec-table">
          <tbody>
            {data.specifications.map((spec, index) => (
              <tr key={index}>
                <td className="spec-key">{spec.label}</td>
                <td className="spec-value">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> }
     

      <div className={`${!newPanelShow ? "hidden" : ""} overlay`}>
        <AddToPanel data={data} showCart={showCart} qty={qty} />
      </div>
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
            <p>
              The product has been added to your list.{" "}
              <Link to="/account/wishlist">
                <strong>View your list</strong>
              </Link>
              .{" "}
            </p>
            <span onClick={handleAlert}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </>
        )}
      </div>
    </div>
    </>
    
  );
};

export default ProductPreview;
