import { NavLink } from "react-router-dom";
const SubNAv = (props) => {
  return (
    <div className="sub-nav">
      <ul className="sub-nav-list">
        {props.data.map((item, idx) => (
          <li key={idx} className="has-dropdown">
            {item.label}
            <div className="mega-dropdown">
              {item.solo?.length > 0 && (
                <div className="solo">
                  {item.solo.map((solo, soloIdx) => (
                    <h5 key={soloIdx}>
                      <NavLink to={`/products/${solo}`} className="nav-link">
                        {solo}
                      </NavLink>
                    </h5>
                  ))}
                </div>
              )}

              {item.columns.map((col, colIdx) => (
                <div key={colIdx} className="column">
                  <h5><NavLink to={`/products/${col.title}`} className="nav-link">{col.title}</NavLink></h5>
                  <ul>
                    {col.items.map((subItem, subIdx) => (
                      <li key={subIdx}><NavLink to={`/products/${col.title}:${subItem}`} className="nav-sub-link" >{subItem}</NavLink></li>
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

export default SubNAv;
