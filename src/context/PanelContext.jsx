import { createContext, useState, useEffect } from "react";

export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const [panel, setPanel] = useState(() => {
    const stored = localStorage.getItem("panel");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("panel", JSON.stringify(panel));
  }, [panel]);

  useEffect(() => {
    const sum = panel.reduce(
      (acc, item) => acc + item.price * item.purshaseQty,
      0
    );
    setTotal(sum);
  }, [panel]);

  useEffect(() => {
    const sum = panel.reduce(
      (acc, item) => acc + item.price * item.purshaseQty,
      0
    );
    setTotal(sum);

    const qtySum = panel.reduce((acc, item) => acc + item.purshaseQty, 0);
    setCount(qtySum);
  }, [panel]);

  const addItem = (item) => {
    let updatedItem;
    setPanel((prev) => {
      const exists = prev.find((p) => p._id === item._id);
      if (exists) {
        updatedItem = { ...exists, purshaseQty: (exists.purshaseQty ?? 1) + 1 };
        return prev.map((p) => (p._id === item._id ? updatedItem : p));
      }
      updatedItem = { ...item, purshaseQty: 1 };
      return [...prev, updatedItem];
    });
    return updatedItem;
  };

  const removeItem = (_id) => {
    setPanel((prev) => prev.filter((item) => item._id !== _id));
  };

  const updateQty = (_id, newQty) => {
    setPanel((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, purshaseQty: newQty } : item
      )
    );
  };

  return (
    <PanelContext.Provider
      value={{ panel, total,count, addItem, removeItem, updateQty }}
    >
      {children}
    </PanelContext.Provider>
  );
};
