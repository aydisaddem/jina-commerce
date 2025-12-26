import { NavLink } from "react-router-dom";
import { slugify } from "../../utils/slugify";


const SubNav = ({ data }) => {
  return (
    <div className="sub-nav">
      <ul className="sub-nav-list">
        {data.map((item, idx) => (
          <li key={idx} className="nav-item">
            <span className="has-dropdown">{item.label}</span>
            <div className="mega-dropdown">
              {item.solo?.length > 0 && (
                <div className="solo">
                  {item.solo.map((solo, soloIdx) => (
                    <h5 key={soloIdx}>
                      <NavLink
                        to={`/products/${slugify(solo)}`}
                        className="nav-link"
                      >
                        {solo}
                      </NavLink>
                    </h5>
                  ))}
                </div>
              )}

              {item.columns.map((col, colIdx) => (
                <div key={colIdx} className="column">
                  <h5>
                    <NavLink
                      to={`/products/${slugify(col.title)}`}
                      className="nav-link"
                    >
                      {col.title}
                    </NavLink>
                  </h5>
                  <ul>
                    {col.items.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <NavLink
                          to={`/products/${slugify(col.title)}/${slugify(subItem)}`}
                          className="nav-sub-link"
                        >
                          {subItem}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubNav;
