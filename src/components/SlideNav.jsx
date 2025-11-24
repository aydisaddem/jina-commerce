import React, { useState } from "react";
const SlideNav = (props) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Slide Navbar */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <ul className="nav-list">
          {props.data.map((item, idx) => (
            <li key={idx} className="nav-item">
              <div
                className="nav-label"
                onClick={() => toggleMenu(idx)}
              >
                {item.label}
              </div>

              {/* Solo Items */}
              {item.solo && activeMenu === idx && (
                <ul className="solo-list">
                  {item.solo.map((soloItem, i) => (
                    <li key={i} className="solo-item">{soloItem}</li>
                  ))}
                </ul>
              )}

              {/* Column Items */}
              {item.columns && activeMenu === idx && (
                <div className="columns">
                  {item.columns.map((col, cIdx) => (
                    <div key={cIdx} className="column">
                      <h4>{col.title}</h4>
                      <ul>
                        {col.items.map((colItem, ci) => (
                          <li key={ci}>{colItem}</li>
                        ))}
                      </ul>
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
