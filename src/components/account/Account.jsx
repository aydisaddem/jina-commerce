import "../../styles/account.css";
import React from "react";
import { useParams, NavLink } from "react-router-dom";
import Panel from "./Panel";
import Orders from "./Orders";
import Profile from "./Profile";
import Wishlist from "./Wishlist";

const Account = () => {
  const { section } = useParams(); 
  const items = ["Profile", "Wishlist", "Panel", "Orders"];

  const renderComponent = () => {
    switch (section?.toLowerCase()) {
      case "profile":
        return <Profile />;
      case "panel":
        return <Panel />;
      case "wishlist":
        return <Wishlist />;
      case "orders":
        return <Orders />;
      default:
        return <Profile />; // fallback
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
