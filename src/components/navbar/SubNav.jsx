
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
                    <h5 key={soloIdx}>{solo}</h5>
                  ))}
                </div>
              )}

              {item.columns.map((col, colIdx) => (
                <div key={colIdx} className="column">
                  <h5>{col.title}</h5>
                  <ul>
                    {col.items.map((subItem, subIdx) => (
                      <li key={subIdx}>{subItem}</li>
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

export default SubNAv ;
