import { Link, NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import SubNAv from "./SubNav.jsx";
import SlideNav from "./SlideNav.jsx";
import { useState } from "react";
const Navbar = () => {
  const [isVisible, setIsVisble] = useState(false);
  const [isVisibleSearch, setIsVisbleSearch] = useState(false);
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = "0";

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
  const handlePanel = (e) => setIsVisble(!isVisible);
  const handleSearch = (e) => {
    e.preventDefault();
    setIsVisbleSearch(!isVisibleSearch);
  };
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
                  <NavLink to="/auth">Login</NavLink>
                </li>
              </ul>
            </div>
            <div className="panel actions" onClick={handlePanel}>
              <i className="fa-solid fa-box"></i>
            </div>
            <div
              className={`overlay ${isVisible ? "" : "hidden"}`}
              onClick={handlePanel}
            ></div>
            <div className={`panel-menu ${isVisible ? "" : "hidden"}`}>
              <div className="panel-header">
                <button className="close-panel-btn" onClick={handlePanel}>
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
