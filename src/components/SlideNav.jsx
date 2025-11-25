import React, { useState } from "react";
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
      {open && <div className={`overlay-sidebar ${open ? "open" : ""}`} onClick={() => setOpen(false)} />}
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
                 <span className={`arrow ${activeMenu === idx ? "down" : "right"}`}>
    {activeMenu === idx ? "▼" : "▶"}
  </span>
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
                      <div
          className="column-label"
          onClick={() => toggleColumn(cIdx)}
        >
          {col.title}
          <span className={`arrow ${activeColumn === cIdx ? "down" : "right"}`}>
            {activeColumn === cIdx ? "▼" : "▶"}
          </span>
        </div>
                      {activeColumn === cIdx && (
          <ul className="column-list">
            {col.items.map((colItem, ci) => (
              <li key={ci}>{colItem}</li>
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
