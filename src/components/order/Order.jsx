import "../../styles/order.css";
import { PanelContext } from "../../context/PanelContext.jsx";
import { useState, useContext, useEffect } from "react";
import Summary from "./Summary.jsx";
import CheckoutAccordion from "./CheckoutAccordion.jsx";
const Order = () => {
  const { panel, total, count } = useContext(PanelContext);
  return (
    <div id="order-container">
      <CheckoutAccordion panel={panel} total={total} count={count}/>
      <Summary panel={panel} total={total} count={count}/>
    </div>
    
  );
};

export default Order;
