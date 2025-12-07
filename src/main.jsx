import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Authentication from "./components/authentication/Authentication.jsx";
import Landing from "./components/Landing.jsx";
import Products from "./components/Products.jsx";
import Category from "./components/Category.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":category" element={<Category />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
