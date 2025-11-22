import "../styles/navbar.css";
import React, { useState } from "react";
const Navbar = () => {
  const [isVisible, setIsVisble] = useState(false);
  const handlePanel = () => setIsVisble(!isVisible);
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = "0";

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleQtyDecrease = () => {
    if (qty > 1) setQty(qty - 1);
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

  return (
    <nav className="navbar">
      <div className="main-nav">
        <div className="navbar-logo">
          <a className="logo" data-text="Awesome">
            <span className="actual-text">&nbsp;JINAshop&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;JINAshop&nbsp;
            </span>
          </a>{" "}
        </div>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        <div className="navbar-actions">
          <a href="/settings">
            <i className="fa-solid fa-gear"></i> Settings
          </a>
          <div className="dropdown">
            <a href="/account" className="dropdown-toggle">
              <i className="fa-regular fa-user"></i> Account
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/orders">Orders</a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
          <div className="panel" onClick={handlePanel}>
            <a href="#">
              <i className="fa-solid fa-box"></i> Panel
            </a>
          </div>
          <div
            className={`overlay ${isVisible ? "" : "hidden"}`}
            onClick={handlePanel}
          ></div>
          <div className={`panel-menu ${isVisible ? "" : "hidden"}`}>
            <div className="panel-header">
              <button className="close-btn" onClick={handlePanel}>
                <span className="X"></span>
                <span className="Y"></span>
                <div className="close">Close</div>
              </button>
              <h3>Mini panel</h3>
            </div>
            <div className="panel-body">
              <article
                className="product-card"
                aria-label="Sweat oversize- grey"
              >
                <img
                  className="product-image"
                  src="https://celio.tn/media/catalog/product/cache/48fcea1b01216d36f3119b07a85f18aa/1/8/184438-2545-MEBISLOCK_GREYGRANIT-WEB3-1_5.jpg"
                  alt="sweat oversize grey"
                  width="140"
                  height="160"
                  loading="lazy"
                />

                <div className="product-info">
                  <h2 className="product-title">
                    Sweat oversize à capuche - gris
                  </h2>

                  <p className="product-price" aria-label="Product price">
                    169,90 TND
                  </p>

                  <div className="qty-row">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={handleQtyDecrease}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="qty-input"
                      value={qty}
                      onChange={handleQtyChange}
                      min="1"
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={handleQtyIncrease}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
              <p className="total">Total : {total} TND</p>
              <button className="toPanel">to Panel</button>
              <button className="toOrder">process order</button>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-nav">
  <ul>
    <li className="has-dropdown">
      Computers
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
      Phones & Tablets
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
      Storage
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
      Impression
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
       TV-Sound-Photos
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
      Security
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
    <li className="has-dropdown">
      Network & Connections
      <div className="mega-dropdown">
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
        <div className="column">
          <h4>Imprimantes</h4>
          <ul>
            <li>À Réservoir Intégré</li>
            <li>Jet D'encre</li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</div>

    </nav>
  );
};

export default Navbar;
