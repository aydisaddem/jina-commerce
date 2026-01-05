import { NavLink, useParams } from "react-router-dom";
import { deslugify } from "../../utils/slugify"; 
import "../../styles/breadcrumb.css";

const Breadcrumb = ({data}) => {
  const { category, subCategory,brand, id } = useParams();

  const segments = [
    { label: "Accueil", path: "/" },
    {label: "Products", path: "/products"}
  ];

  

  if(brand){
     segments.push({
      label: deslugify(brand),
      path: `/products/brands/${brand}`,
    });
  }

  if (category) {
    segments.push({
      label: deslugify(category),
      path: `/products/${category}`,
    });
  }

  if (subCategory) {
    segments.push({
      label: deslugify(subCategory),
      path: `/products/${category}/${subCategory}`,
    });
  }

  if (id) {
    segments.push({
      label: data?.reference || "Aperçu du produit", 
    });
  }

  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb-list">
        {segments.map((segment, idx) => (
          <li key={idx} className="breadcrumb-item">
            {segment.path ? (
              <NavLink to={segment.path} className="breadcrumb-link">
                {segment.label}
              </NavLink>
            ) : (
              <span className="breadcrumb-current">{segment.label}</span>
            )}
            {idx < segments.length - 1 && (
              <span className="breadcrumb-separator">|</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
