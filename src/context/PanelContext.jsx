import { createContext, useState, useEffect } from "react";

export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [panel, setPanel] = useState(() => {
    const stored = localStorage.getItem("panel");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("panel", JSON.stringify(panel));
  }, [panel]);

  return (
    <PanelContext.Provider value={{ panel, setPanel }}>
      {children}
    </PanelContext.Provider>
  );
};
