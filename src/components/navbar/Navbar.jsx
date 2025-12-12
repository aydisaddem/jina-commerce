import { Link, NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import SubNAv from "./SubNav.jsx";
import SlideNav from "./SlideNav.jsx";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { PanelContext } from "../../context/PanelContext.jsx";

const Navbar = () => {
  const [isVisible, setIsVisble] = useState(false);
  const [isVisibleSearch, setIsVisbleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { panel, total, removeItem, updateQty } = useContext(PanelContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
 

 

 const navItems = [
    {
      label: "Computers",
      columns: [
        {
          title: "Laptop",
          items: ["Laptop", "Gaming Laptop", "Professional Laptop"],
        },
        {
          title: "Desktop PCs",
          items: ["Gaming Desktop PCs", "All-in-One PCs", "Full Gaming Setups"],
        },
        {
          title: "Accessories",
          items: [
            "Headsets & Earphones",
            "Bags & Backpacks",
            "Mouse",
            "Keyboards",
            "Mouse Pads",
            "Coolers",
            "Webcams",
            "Monitors",
          ],
        },
        {
          title: "Computer Components",
          items: [
            "Internal Hard Drive",
            "Fan & Cooler",
            "Processor",
            "Motherboard",
            "Graphics Card",
            "Laptop Keyboard",
            "Laptop Battery",
            "Laptop Charger",
          ],
        },
      ],
    },
    {
      label: "Phones & Tablets",
      solo: ["Mobile Phones", "Smartphones", "Landline Phones", "Smartwatches"],

      columns: [
        {
          title: "Tablets",
          items: [
            "Touchscreen Tablets",
            "Graphic Tablets",
            "Tablet Protective Cases",
            "Tablet Chargers & Cables",
            "Tablet Screen Protectors",
            "Miscellaneous Tablet Accessories",
          ],
        },
        {
          title: "Phone Accessories",
          items: [
            "Phone Protective Cases",
            "Smartphone Screen Protectors",
            "Phone Chargers & Cables",
            "Power Banks",
            "Miscellaneous Phone Accessories",
          ],
        },
      ],
    },

    {
      label: "Storage",
      solo: [
        "External Hard Drives",
        "Storage Servers",
        "Storage Accessories",
        "USB Flash Drives",
        "Memory Cards",
      ],
      columns: [
        {
          title: "Internal Drives",
          items: [
            "Standard Internal",
            "Drives",
            "SSD Drives",
            "Internal Drives for Storage Servers",
            "Internal Drives for Video Surveillance",
          ],
        },
      ],
    },
    {
      label: "Impression",
      solo: ["Fax", "Scanners machines"],
      columns: [
        {
          title: "Printers",
          items: [
            "Integrated ink tank printers",
            "Inkjet printers and multifunction printers",
            "Laser printers and multifunction printers",
            "Professional printers",
            "Printer accessories",
          ],
        },
        {
          title: "Copiers",
          items: [
            "A4 | A3 copiers",
            "Copier accessories",
            "A4 paper",
            "A3 paper",
            "Envelopes",
            "Photo paper",
          ],
        },
      ],
    },
    {
      label: "TV-Sound-Photos",
      columns: [
        {
          title: "Video Projectors",
          items: ["Video Projectors", "Video Projector Accessories"],
        },
        {
          title: "Consoles & Games",
          items: ["Consoles", "Game Controllers", "Console Accessories"],
        },
        {
          title: "Televisions",
          items: ["Televisions", "TV Accessories"],
        },
        {
          title: "Sound",
          items: [
            "Home Theater",
            "Systems",
            "Soundbars",
            "Headphones & Earphones",
            "Speakers",
            "Radio - Alarm Clock",
            "Stereo System",
            "Microphone",
          ],
        },
      ],
    },
    {
      label: "Security",
      columns: [
        {
          title: "Alarm System",
          items: ["Wired Alarm", "Wireless Alarm", "Accessories"],
        },
        {
          title: "Security Equipment",
          items: [
            "Surveillance Cameras",
            "Security Kits",
            "Recorders",
            "Security Accessories",
            "Detectors and Sensors",
          ],
        },
      ],
    },
    {
      label: "Network & Connections",
      columns: [
        {
          title: "Network",
          items: [
            "Switches / Routers / Access Points",
            "Network Cards",
            "Wi-Fi - Bluetooth Adapters",
            "Powerline Adapters",
            "Network Cabinets and Enclosures",
            "Power Strips",
            "Network Accessories",
          ],
        },
        {
          title: "Cables and Connectors",
          items: [
            "HDMI Cables",
            "USB Cables",
            "Network Cables",
            "FireWire Cables",
            "TV/Audio/DVD Screen Cables",
            "Power Cables",
            "Adapters/Converters",
          ],
        },
        {
          title: "Enclosures and Accessories",
          items: ["Network Enclosures and Cabinets", "Accessories"],
        },
      ],
    },
  ];
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

  const handleSearch = (e) => {
    e.preventDefault();
    setIsVisbleSearch(!isVisibleSearch);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <nav className="navbar">
        <div className="main-nav">
          <SlideNav data={navItems} />
          <div className="navbar-logo">
            <NavLink to="/" className="logo" data-text="Awesome">
              <span className="actual-text">&nbsp;JINAshop&nbsp;</span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;JINAshop&nbsp;
              </span>
            </NavLink>
          </div>

          <div className="navbar-search">
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <i className="fa-solid fa-search"></i>
            </button>
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
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
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
              <span className="cart-count"> {panel.length}</span>
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
                      <article key={idx} className="product-card">
                        <img
                          className="product-image"
                          src={item.pictures[0]}
                          width="140"
                          height="160"
                          loading="lazy"
                        />

                        <div className="product-info">
                          <h4 className="product-title">{item.name}</h4>

                          <p
                            className="product-price"
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
                          onClick={() => removeItem(item._id)}
                        >
                          <svg className="delete-svgIcon" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                          </svg>
                        </button>
                      </article>
                    ))}
                    <p className="total">Total : {total} TND</p>
                    <button className="toPanel">to Panel</button>
                    <button className="toOrder">process order</button>
                  </>
                ) : (
                  <p className="empty-panel">Empty panel</p>
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
        />
        <button type="submit">
          <i className="fa-solid fa-search"></i>
        </button>
      </div>
      <div
        className={`overlay ${isVisibleSearch ? "" : "hidden"}`}
        onClick={handleSearch}
      ></div>
    </>
  );
};

export default Navbar;
