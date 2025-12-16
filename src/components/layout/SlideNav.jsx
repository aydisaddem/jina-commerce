import { useState } from "react";
import { NavLink } from "react-router-dom";
import { slugify } from "../../utils/slugify";

const SlideNav = (props) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };
  const toggleColumn = (index) => {
    setActiveColumn(activeColumn === index ? null : index);
  };

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div
          className={`overlay-sidebar ${open ? "open" : ""}`}
          onClick={() => setOpen(false)}
        />
      )}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✕
        </button>

        <ul className="nav-list">
          {props.data.map((item, idx) => (
            <li key={idx} className="nav-item">
              <div className="nav-label" onClick={() => toggleMenu(idx)}>
                {item.label}
                <span
                  className={`arrow-SlideNav ${activeMenu === idx ? "down" : "right"}`}
                >
                  {activeMenu === idx ? "▼" : "▶"}
                </span>
              </div>

              {/* Solo Items */}
              {item.solo && activeMenu === idx && (
                <ul className="solo-list">
                  {item.solo.map((soloItem, i) => (
                    <li key={i} className="solo-item">
                      <NavLink
                        to={`/products/${slugify(soloItem)}`}
                        style={{ all: "unset" }}
                      >
                        {soloItem}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}

              {/* Column Items */}
              {item.columns && activeMenu === idx && (
                <div className="columns">
                  {item.columns.map((col, cIdx) => (
                    <div key={cIdx} className="column">
                      <div
                        className="column-label"
                        onClick={() => toggleColumn(cIdx)}
                      >
                        <NavLink
                          to={`/products/${slugify(col.title)}`}
                          style={{ all: "unset" }}
                        >
                          {col.title}{" "}
                        </NavLink>
                        <span
                          className={`arrow-SlideNav ${
                            activeColumn === cIdx ? "down" : "right"
                          }`}
                        >
                          {activeColumn === cIdx ? "▼" : "▶"}
                        </span>
                      </div>
                      {activeColumn === cIdx && (
                        <ul className="column-list">
                          {col.items.map((colItem, ci) => (
                            <li key={ci}>
                              <NavLink
                                to={`/products/${slugify(col.title)}/${slugify(
                                  colItem
                                )}`}
                                style={{ all: "unset" }}
                              >
                                {colItem}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SlideNav;
