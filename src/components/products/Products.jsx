import "../../styles/products.css";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import {Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanelContext } from "../../context/PanelContext.jsx";
import AddToPanel from "./AddToPanel.jsx";
import { deslugify } from "../../utils/slugify.js";
import Breadcrumb from "../layout/Breadcrumb.jsx";
import NotFound from "../NotFound.jsx";
import Loading from "../Loading.jsx";
import searchImg from "../../assets/search.png";
import ListRender from "./ListRender.jsx";
import GridRender from "./GridRender.jsx";
import { useSEO } from '../../Hooks/useSEO.js';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [gridView, setGridView] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [newPanelShow, setNewPanelShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [openSpecs, setOpenSpecs] = useState({});
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableCategoriesCounts, setAvailableCategoryCounts] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const { isLoggedIn, user, setUser } = useContext(AuthContext);
  const { addItem } = useContext(PanelContext);
  const { category, subCategory, brand, search } = useParams();
  const options = [
    { value: "asc", label: "Ascending price" },
    { value: "desc", label: "Descending price" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let endpoint = "/products";
        if (brand) {
          endpoint = `/products/brands?brand=${encodeURIComponent(
            deslugify(brand)
          )}`;
        } else if (search) {
          endpoint = `/products/search?search=${encodeURIComponent(
            deslugify(search)
          )}`;
        } else if (category && subCategory) {
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
        if (brand) {
          const categoryCounts = data.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
          }, {});
          setAvailableCategories(Object.keys(categoryCounts));
          setAvailableCategoryCounts(categoryCounts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory, brand, search]);

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

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesBrand && matchesPrice && matchesSpecs && matchesCategory;
    });

    setFilteredProducts(result);
  }, [
    products,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedSpecs,
    selectedCategories,
  ]);

  // Helper function to format category/subcategory names for display
  const formatName = (str) => {
    if (!str) return '';
    // Convert "phones-tablets" to "Phones Tablets"
    // or "smartphones" to "Smartphones"
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Generate title and canonical URL based on the route
  let title, description, canonical;
  
  if (search) {
    // Search results page: /products/search/:search
    title = `Search Results for "${search}" - JINA SHOP Tunisia`;
    description = `Search results for "${search}" at JINA SHOP. Find electronics and tech products in Tunisia.`;
    canonical = `https://jinashop.netlify.app/products/search/${search}`;
    
  } else if (brand) {
    // Brand page: /products/brands/:brand
    const brandName = formatName(brand);
    title = `${brandName} Products - Buy at JINA SHOP Tunisia`;
    description = `Shop ${brandName} products at JINA SHOP. Best prices in Tunisia with home delivery nationwide.`;
    canonical = `https://jinashop.netlify.app/products/brands/${brand}`;
    
  } else if (subCategory) {
    // Subcategory page: /products/:category/:subCategory
    const categoryName = formatName(category);
    const subCategoryName = formatName(subCategory);
    
    title = `${subCategoryName} - ${categoryName} | JINA SHOP Tunisia`;
    description = `Shop ${subCategoryName} in ${categoryName} at JINA SHOP. Best prices in Tunisia with home delivery nationwide. Pay on delivery available.`;
    canonical = `https://jinashop.netlify.app/products/${category}/${subCategory}`;
    
  } else if (category) {
    // Category page: /products/:category
    const categoryName = formatName(category);
    
    title = `${categoryName} - Buy Online at JINA SHOP Tunisia`;
    description = `Shop ${categoryName} at JINA SHOP. Best prices in Tunisia with home delivery nationwide. Pay on delivery available.`;
    canonical = `https://jinashop.netlify.app/products/${category}`;
    
  } else {
    // All products page: /products
    title = 'All Products - JINA SHOP Tunisia | Electronics Store';
    description = 'Browse all electronics products at JINA SHOP. Computers, phones, tablets and more with home delivery across Tunisia.';
    canonical = 'https://jinashop.netlify.app/products';
  }
  
  // Apply SEO
  useSEO({
    title,
    description,
    canonical
  });


  function extractSpecFilters(products) {
    const specMap = {};

    products.forEach((product) => {
      product.specifications?.forEach((spec) => {
        const key = spec.label.trim();
        const value = spec.value.trim();

        if (!specMap[key]) {
          specMap[key] = {};
        }

        // Count occurrences
        specMap[key][value] = (specMap[key][value] || 0) + 1;
      });
    });

    // Normalize into array of { label, values: [{value, count}] }
    const normalizedSpecs = Object.entries(specMap).map(([label, values]) => ({
      label,
      values: Object.entries(values).map(([value, count]) => ({
        value,
        count,
      })),
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

  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  const filterBrands = Object.keys(brandCounts).sort();
  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    minPrice !== 1 ||
    maxPrice !== 20000 ||
    Object.values(selectedSpecs).some((values) => values.length > 0);

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
    setSelectedCategories([]);
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

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  function getVisiblePages(currentPage, totalPages) {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }

  return (
    <>
    <h1 className="visually-hidden">
        Products
      </h1>
      <Breadcrumb />
      {loading ? (
        <Loading />
      ) : products.length ? (
        <div className="products-container">
          <div className="filter-panel">
            <h3 onClick={() => setShowMobileFilters(!showMobileFilters)}>
              {" "}
              Filter{" "}
              <span
                id="mobile-filter-arrow"
                className={`filter-arrow  ${
                  showMobileFilters ? "down" : "right"
                }`}
              />{" "}
            </h3>
            <div
              className={`filter-content ${showMobileFilters ? "open" : ""}`}
            >
              {hasActiveFilters && (
                <div className="active-filters">
                  <button
                    className="clear-filters"
                    onClick={handleClearFilters}
                  >
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
                    {selectedCategories.map((category) => (
                      <span key={category} className="filter-tag">
                        {category}
                        <button
                          onClick={() => {
                            setSelectedCategories((prev) =>
                              prev.filter((b) => b !== category)
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
              {!brand && (
                <div className="filter-item">
                  <h4
                    className="filter-header"
                    onClick={() => setShowBrands(!showBrands)}
                  >
                    Brands
                    <span
                      className={`filter-arrow ${
                        showBrands ? "down" : "right"
                      }`}
                    />
                  </h4>

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
                        <span className="filter-label">
                          <span className="filter-value">{brand}</span>
                          <span className="filter-count">
                            ({brandCounts[brand]})
                          </span>
                        </span>
                      </label>
                    ))}
                </div>
              )}

              {brand && (
                <div className="filter-item">
                  <h4
                    className="filter-header"
                    onClick={() => setShowCategory(!showCategory)}
                  >
                    Categories
                    <span
                      className={`filter-arrow ${
                        showBrands ? "down" : "right"
                      }`}
                    />
                  </h4>{" "}
                 {showCategory &&
  availableCategories.map((category) => (
    <label key={category} className="filter-checkbox">
      <input
        type="checkbox"
        checked={selectedCategories.includes(category)}
        onChange={() => {
          setSelectedCategories((prev) =>
            prev.includes(category)
              ? prev.filter((c) => c !== category)
              : [...prev, category]
          );
        }}
      />
      <span className="filter-label">
        <span className="filter-value">{category}</span>
        <span className="filter-count">({availableCategoriesCounts[category] || 0})</span>
      </span>
    </label>
  ))}

                </div>
              )}

              {category &&
                specFilters.map(({ label, values }) => (
                  <div className="filter-item" key={label}>
                    <h4
                      className="filter-header"
                      onClick={() =>
                        setOpenSpecs((prev) => ({
                          ...prev,
                          [label]: !prev[label],
                        }))
                      }
                    >
                      {label}
                      <span
                        className={`filter-arrow ${
                          openSpecs[label] ? "down" : "right"
                        }`}
                      />
                    </h4>

                    {openSpecs[label] &&
                      values.map(({ value, count }) => (
                        <label key={value} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={
                              selectedSpecs[label]?.includes(value) || false
                            }
                            onChange={() => handleSpecChange(label, value)}
                          />
                          <span className="filter-label">
                            <span className="filter-value">{value}</span>
                            <span className="filter-count">({count})</span>
                          </span>
                        </label>
                      ))}
                  </div>
                ))}
            </div>
          </div>
          {filteredProducts.length ? (
            <div id="products-render">
              <div className="products-render-header">
                <div className="view-select">
                  <i
                    className={`fa-solid fa-list ${
                      !gridView ? "listView-active" : ""
                    }`}
                    onClick={() => setGridView(false)}
                  ></i>
                  <i
                    className={`fa-solid fa-grip-vertical ${
                      gridView ? "gridView-active" : ""
                    }`}
                    onClick={() => setGridView(true)}
                  ></i>
                </div>

                <p className="filteredProducts-count">
                  There are {filteredProducts.length} products.
                </p>
                <div className="sort-dropdown">
                  <label htmlFor="sortOrder">Sort by </label>
                  <Select
                    id="sortOrder"
                    options={options}
                    value={options.find((o) => o.value === sortOrder)}
                    onChange={(selected) => setSortOrder(selected.value)}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? "var(--secondary-color)"
                          : "white",
                        color: state.isFocused ? "white" : "var(--grey-color)",
                        cursor: "pointer",
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        borderColor: "var(--divider)",
                        fontSize: "0.9rem",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px var(--secondary-color)"
                          : "none",
                        "&:hover": {
                          borderColor: "var(--secondary-color)",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "var(--grey-color)",
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: "var(--grey-color)",
                        "&:hover": {
                          color: "var(--secondary-color)",
                        },
                      }),
                    }}
                  />
                </div>
              </div>
              {!gridView ? (
                <ListRender
                  paginatedProducts={paginatedProducts}
                  handleWishlist={handleWishlist}
                  handleAddToPanel={handleAddToPanel}
                />
              ) : (
                <GridRender
                  paginatedProducts={paginatedProducts}
                  handleWishlist={handleWishlist}
                  handleAddToPanel={handleAddToPanel}
                />
              )}

              <div className="pagination-bar">
                <span>
                  Displaying {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredProducts.length
                  )}{" "}
                  Of {filteredProducts.length} Item(s)
                </span>

                <div className="pagination-buttons">
                  {currentPage > 1 && (
                    <button
                      className="page-button"
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      &lt;
                    </button>
                  )}

                  {getVisiblePages(currentPage, totalPages).map((page, i) =>
                    page === "..." ? (
                      <span key={`ellipsis-${i}`} className="ellipsis">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        className={`page-button ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {currentPage < totalPages && (
                    <button
                      className="page-button"
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      &gt;
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <NotFound img={searchImg} message={"No products found"} />
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
          <div className={`${!newPanelShow ? "hidden" : ""} overlay`}>
            <AddToPanel data={selectedItem} showCart={showCart} qty={1} />
          </div>
        </div>
      ) : (
        <NotFound img={searchImg} message={"No products to display"} />
      )}
    </>
  );
};

export default Products;
