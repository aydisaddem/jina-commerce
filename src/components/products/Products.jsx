import "../../styles/products.css";
import ItemCarousel from "./itemCarousel";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { brands } from "../../data/brands";
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanelContext } from "../../context/PanelContext.jsx";
import AddToPanel from "./addToPanel.jsx";
import { slugify, deslugify } from "../../utils/slugify.js";
import Breadcrumb from "../layout/Breadcrumb.jsx";
import NotFound from "../NotFound.jsx";
import Loading from "../Loading.jsx"
import searchImg from "../../assets/search.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [newPanelShow, setNewPanelShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [openSpecs, setOpenSpecs] = useState({});
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(20000);
 const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { isLoggedIn, user, setUser } = useContext(AuthContext);
  const { addItem } = useContext(PanelContext);
  const { category, subCategory } = useParams();

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true); // enter loading state before request

      let endpoint = "/products";
      if (category && subCategory) {
        endpoint = `/products?category=${encodeURIComponent(
          deslugify(category)
        )}&subCategory=${encodeURIComponent(deslugify(subCategory))}`;
      } else if (category) {
        endpoint = `/products?category=${encodeURIComponent(
          deslugify(category)
        )}`;
      }

      const { data } = await api.get(endpoint);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // exit loading state no matter what
    }
  };

  fetchProducts();
}, [category, subCategory]);


  useEffect(() => {
    const result = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      const matchesSpecs = Object.entries(selectedSpecs).every(
        ([label, selectedValues]) => {
          if (selectedValues.length === 0) return true;

          const productValues = product.specifications
            ?.filter((spec) => spec.label === label)
            .map((spec) => spec.value);

          return selectedValues.some((val) => productValues.includes(val));
        }
      );

      return matchesBrand && matchesPrice && matchesSpecs;
    });

    setFilteredProducts(result);
  }, [products, selectedBrands, minPrice, maxPrice, selectedSpecs]);

  function extractSpecFilters(products) {
    const specMap = {};

    products.forEach((product) => {
      product.specifications?.forEach((spec) => {
        const key = spec.label.trim();
        const value = spec.value.trim();

        if (!specMap[key]) {
          specMap[key] = new Set();
        }

        specMap[key].add(value);
      });
    });

    // Convert Sets to arrays
    const normalizedSpecs = Object.entries(specMap).map(([label, values]) => ({
      label,
      values: Array.from(values),
    }));

    return normalizedSpecs;
  }
  const specFilters = extractSpecFilters(products);

  useEffect(() => {
    const initialSpecs = specFilters.reduce((acc, { label }) => {
      acc[label] = [];
      return acc;
    }, {});
    setSelectedSpecs(initialSpecs);
  }, [products]);

  const filterBrands = [...new Set(products.map((product) => product.brand))];
  const hasActiveFilters =
  selectedBrands.length > 0 ||
  minPrice !== 1 ||
  maxPrice !== 20000 ||
  Object.values(selectedSpecs).some(values => values.length > 0);


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
        category: item.category,
        subCategory: item.subCategory,
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

  const handleMinChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setMinPrice(1);
    setMaxPrice(20000);
    setSelectedSpecs((prev) => {
      const cleared = {};
      Object.keys(prev).forEach((label) => {
        cleared[label] = [];
      });
      return cleared;
    });
  };

  function handleSpecChange(label, value) {
    setSelectedSpecs((prev) => {
      const current = prev[label] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [label]: updated };
    });
  }

  return (
    <>
      <Breadcrumb />
      {loading?(<Loading/>):  products.length ? (
        <div className="products-container">
          <div className="filter-panel">
          <h3 onClick={() => setShowMobileFilters(!showMobileFilters)}> Filter <span id="mobile-filter-arrow" className={`filter-arrow  ${showMobileFilters ? "down" : "right"}`} /> </h3>
            <div className={`filter-content ${showMobileFilters ? "open" : ""}`}>

         {hasActiveFilters && (
              <div className="active-filters">
                <button className="clear-filters" onClick={handleClearFilters}>
                  CLEAR FILTERS <i className="fa-solid fa-eraser"></i>
                </button>

                <div className="active-tags">
                  {minPrice !== 1 || maxPrice !== 20000 ? (
                    <span className="filter-tag">
                      {minPrice} - {maxPrice}DT
                      <button
                        onClick={() => {
                          setMinPrice(1);
                          setMaxPrice(20000);
                        }}
                      >
                        x
                      </button>
                    </span>
                  ) : null}

                  {selectedBrands.map((brand) => (
                    <span key={brand} className="filter-tag">
                      {brand}
                      <button
                        onClick={() => {
                          setSelectedBrands((prev) =>
                            prev.filter((b) => b !== brand)
                          );
                        }}
                      >
                        x
                      </button>
                    </span>
                  ))}
                  {Object.entries(selectedSpecs).map(([label, values]) =>
                    values.map((value) => (
                      <span key={`${label}-${value}`} className="filter-tag">
                        {label}: {value}
                        <button
                          onClick={() => {
                            setSelectedSpecs((prev) => {
                              const updated = { ...prev };
                              updated[label] = updated[label].filter(
                                (v) => v !== value
                              );
                              return updated;
                            });
                          }}
                        >
                          x
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="filter-item">
              <h4
                className="filter-header"
                onClick={() => setShowPriceRange(!showPriceRange)}
              >
                Price
                <span
                  className={`filter-arrow ${
                    showPriceRange ? "down" : "right"
                  }`}
                />
              </h4>
              {showPriceRange && (
                <div className="priceRange-container">
                  <div
                    data-range="#third"
                    data-value-1="#second"
                    data-value-0="#first"
                    className="slider"
                  >
                    <label className="label-min-value">{minPrice}</label>
                    <label className="label-max-value">{maxPrice}</label>
                  </div>
                  <div className="rangeslider">
                    <input
                      className="min input-ranges"
                      type="range"
                      min="1"
                      max="20000"
                      name="minPrice"
                      value={minPrice}
                      onChange={handleMinChange}
                    />
                    <input
                      className="max input-ranges"
                      type="range"
                      min="1"
                      max="20000"
                      name="maxPrice"
                      value={maxPrice}
                      onChange={handleMaxChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="filter-item">
              <h4
                className="filter-header"
                onClick={() => setShowBrands(!showBrands)}
              >
                Brands
                <span
                  className={`filter-arrow ${showBrands ? "down" : "right"}`}
                />
              </h4>{" "}
              {showBrands &&
                filterBrands.map((brand) => (
                  <label key={brand} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        setSelectedBrands((prev) =>
                          prev.includes(brand)
                            ? prev.filter((b) => b !== brand)
                            : [...prev, brand]
                        );
                      }}
                    />
                    {brand}
                  </label>
                ))}
            </div>

            {category && specFilters.map(({ label, values }) => (
  <div className="filter-item" key={label}>
    <h4
      className="filter-header"
      onClick={() =>
        setOpenSpecs(prev => ({ ...prev, [label]: !prev[label] }))
      }
    >
      {label}
      <span
        className={`filter-arrow ${openSpecs[label] ? "down" : "right"}`}
      />
    </h4>

    {openSpecs[label] && values.map((value) => (
      <label key={value} className="filter-checkbox">
        <input
          type="checkbox"
          checked={selectedSpecs[label]?.includes(value) || false}
          onChange={() => handleSpecChange(label, value)}
        />
        {value}
      </label>
    ))}
  </div>
))}
            </div>
   

          </div>
{filteredProducts.length? (
  <div id="products-render">
            {" "}
            {filteredProducts.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-picture-container">
                  <ItemCarousel pictures={item.pictures} name={item.name} />{" "}
                </div>
                <div className="item-description">
                  <NavLink
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
                  </NavLink>
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
          </div>
): (
  <NotFound img={searchImg} message={"No products found"}/>
)}
          

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
                  <NavLink to="/account/wishlist">
                    <strong>View your list</strong>
                  </NavLink>
                  .{" "}
                </p>
                <span onClick={handleAlert}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </>
            )}
          </div>
          <div className={`${!newPanelShow ? "hidden" : ""} overlay`}>
            <AddToPanel data={selectedItem} showCart={showCart} qty={1} />
          </div>
        </div>
      ) : (
        <NotFound img={searchImg} message={"No products to display"} />
      ) }
     
    </>
  );
};

export default Products;
