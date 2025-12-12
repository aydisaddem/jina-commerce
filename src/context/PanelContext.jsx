import { createContext, useState, useEffect } from "react";

export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [panel, setPanel] = useState(() => {
    const stored = localStorage.getItem("panel");
    return stored ? JSON.parse(stored) : [];
  });
  const [total, setTotal] = useState(0);
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
  const addItem = (item) => {
    setPanel((prev) => {
      const exists = prev.some((p) => p._id === item._id);
      return exists ? prev : [...prev, { ...item, purshaseQty: 1 }];
    });
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
    <PanelContext.Provider value={{ panel,total, addItem, removeItem, updateQty }}>
      {children}
    </PanelContext.Provider>
  );
};
