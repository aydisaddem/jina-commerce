import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import SubNAv from "./SubNav.jsx";
import SlideNav from "./SlideNav.jsx";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanelContext } from "../../context/PanelContext.jsx";
import Swal from "sweetalert2";
import { slugify } from "../../utils/slugify.js";
import navItems from "../../data/navItems.js";
import NotFound from "../NotFound.jsx";
import searchImg from "../../assets/search.png";
import api from "../../utils/api.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisble] = useState(false);
  const [isVisibleSearch, setIsVisbleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuggestionsMobile, setShowSuggestionsMobile] = useState(false);

  const { panel, total, count, removeItem, updateQty } =
    useContext(PanelContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

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

  const showPanel = (e) => setIsVisble(!isVisible);

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
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently removed from your panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef0200",
      cancelButtonColor: "#121117",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(_id);
        Swal.fire({
          title: "Deleted!",
          text: "The product has been removed from your panel.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setIsVisbleSearch(!isVisibleSearch);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSuggestionClick = (product) => {
    setSearch("");
    setShowSuggestions(false);
    navigate(
      `/products/${slugify(product.category)}${
        product.subCategory && product.subCategory !== product.category
          ? `/${slugify(product.subCategory)}`
          : ""
      }/preview/${product._id}`
    );
  };

  const handleMobileSuggestionClick = (product) => {
    setSearch("");
    setShowSuggestions(false);
    setIsVisbleSearch(false);
    navigate(
      `/products/${slugify(product.category)}${
        product.subCategory && product.subCategory !== product.category
          ? `/${slugify(product.subCategory)}`
          : ""
      }/preview/${product._id}`
    );
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-search")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applySearch = (e) => {
    e.preventDefault();
    navigate(`products/search/${search}`);
    setSearch("");
    setShowSuggestions(false);

  };
  const applyMobileSearch = (e) => {
    e.preventDefault();
    navigate(`products/search/${search}`);
     setSearch("");
    setShowSuggestions(false);
    setIsVisbleSearch(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="main-nav">
          <SlideNav data={navItems} />
          <div className="navbar-logo">
            <NavLink to="/" data-text="Awesome">
              <span className="logo">JINA SHOP</span>
            </NavLink>
          </div>

          <div className="navbar-search">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
            />
            <button type="submit" onClick={applySearch}>
              <i className="fa-solid fa-search"></i>
            </button>
            {showSuggestions && search && filteredProducts.length > 0 && (
              <div className="search-suggestions">
                {filteredProducts.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.pictures && (
                      <img
                        src={product.pictures[0]}
                        alt={product.name}
                        className="suggestion-image"
                      />
                    )}
                    <div className="suggestion-details">
                      <p className="suggestion-name">{product.name}</p>
                      <p className="suggestion-price">{product.price},000 DT</p>
                    </div>
                  </div>
                ))}
                <div className="all-suggestions">
                  <span onClick={applySearch}>
                    See All ({filteredProducts.length})
                  </span>
                </div>
              </div>
            )}
          </div>

          <div id="navbar-actions">
            <div onClick={handleSearch} className="mobile-search-icon actions">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="dropdown actions">
              <div className="dropdown-toggle">
                <i className="fa-regular fa-user"></i>
              </div>
              <ul className="dropdown-menu">
                {isLoggedIn && (
                  <>
                    <li>
                      <NavLink to="/account/profile">Account</NavLink>
                    </li>
                  </>
                )}

                <li>
                  {isLoggedIn ? (
                    <NavLink to="/auth" onClick={logout}>
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink to="/auth">Login</NavLink>
                  )}
                </li>
              </ul>
            </div>
            <div className="panel actions" onClick={showPanel}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count"> {count}</span>{" "}
              <span className="total-span">{total},000 DT</span>
            </div>
            <div
              className={`overlay ${isVisible ? "" : "hidden"}`}
              onClick={showPanel}
            ></div>
            <div className={`panel-menu ${isVisible ? "" : "hidden"}`}>
              <div className="panel-header">
                <button className="close-panel-btn" onClick={showPanel}>
                  <span className="X"></span>
                  <span className="Y"></span>
                  <div className="close">Close</div>
                </button>
                <h3>Mini panel</h3>
              </div>
              <div className="panel-body">
                {panel.length ? (
                  <>
                    {panel.map((item, idx) => (
                      <article key={idx} className="panel-product-card">
                        <img
                          className="panel-product-image"
                          src={item.pictures[0]}
                          width="140"
                          height="160"
                          loading="lazy"
                        />

                        <div className="panel-product-info">
                          <NavLink
                            to={`/products/${slugify(item.category)}${
                              item.subCategory &&
                              item.subCategory !== item.category
                                ? `/${slugify(item.subCategory)}`
                                : ""
                            }/preview/${item._id}`}
                            style={{ all: "unset" }}
                          >
                            <h4 className="panel-product-title">{item.name}</h4>
                          </NavLink>
                          <p
                            className="panel-product-price"
                            aria-label="Product price"
                          >
                            {item.price * item.purshaseQty},000 DT
                          </p>

                          <div key={item._id} className="qty-row">
                            <button
                              onClick={() =>
                                handleQtyDecrease(item._id, item.purshaseQty)
                              }
                              className="qty-btn"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.purshaseQty}
                              className="qty-input"
                              onChange={(e) => handleQtyChange(item._id, e)}
                              min="1"
                            />
                            <button
                              onClick={() =>
                                handleQtyIncrease(item._id, item.purshaseQty)
                              }
                              className="qty-btn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item._id)}
                        >
                          <svg className="delete-svgIcon" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                          </svg>
                        </button>
                      </article>
                    ))}
                    <p className="total">Total : {total} TND</p>
                    <button className="toPanel" onClick={showPanel}>
                      <NavLink to="/account/panel" style={{ all: "unset" }}>
                        to Panel
                      </NavLink>
                    </button>
                    <button className="toOrder">process order</button>
                  </>
                ) : (
                  <NotFound img={searchImg} message={"empty Panel"} />
                )}
              </div>
            </div>
          </div>
        </div>
        <SubNAv data={navItems} />
      </nav>
      <div className={`mobile-search ${isVisibleSearch ? "" : "hidden"}`}>
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestionsMobile(true)}
        />
        <button type="submit" onClick={applyMobileSearch}>
          <i className="fa-solid fa-search"></i>
        </button>

        {showSuggestionsMobile && search && filteredProducts.length > 0 && (
          <div className="search-suggestions">
            {filteredProducts.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="suggestion-item"
                onClick={() => handleMobileSuggestionClick(product)}
              >
                {product.pictures && product.pictures[0] && (
                  <img
                    src={product.pictures[0]}
                    alt={product.name}
                    className="suggestion-image"
                  />
                )}
                <div className="suggestion-details">
                  <p className="suggestion-name">{product.name}</p>
                  <p className="suggestion-price">{product.price},000 DT</p>
                </div>
              </div>
            ))}
             <div className="all-suggestions">
                  <span onClick={applyMobileSearch}>
                    See All ({filteredProducts.length})
                  </span>
                </div>
          </div>
        )}
      </div>
      <div
        className={`overlay ${isVisibleSearch ? "" : "hidden"}`}
        onClick={handleSearch}
      ></div>
    </>
  );
};

export default Navbar;
