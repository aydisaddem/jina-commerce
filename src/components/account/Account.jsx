import "../../styles/account.css";
import { useParams, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import Panel from "./Panel";
import Orders from "./Orders";
import Profile from "./Profile";
import Wishlist from "./Wishlist";
import { AuthContext } from "../../context/AuthContext.jsx";


const Account = () => {
  const { section } = useParams(); 
  const items = ["Profile", "Wishlist", "Panel", "Orders"];
  useContext(AuthContext);
    const { user } = useContext(AuthContext);

  const renderComponent = () => {
    switch (section?.toLowerCase()) {
      case "profile":
        return <Profile user={user}/>;
      case "panel":
        return <Panel />;
      case "wishlist":
        return <Wishlist />;
      case "orders":
        return <Orders user={user} />;
      default:
        return <Profile user={user} />; // fallback
    }
  };

  return (
    <div id="account">
      <aside id="account-aside">
        <ul>
  {items.map(item => (
          <NavLink to={`/account/${item.toLowerCase()}`}       key={item}
>

    <li
      className={section?.toLowerCase() === item.toLowerCase() ? "active" : ""}
    >
        {item}
    </li>
          </NavLink>

  ))}
</ul>

      </aside>
      <div className="account-container">{renderComponent()}</div>
    </div>
  );
};

export default Account;
