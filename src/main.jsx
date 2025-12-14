import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { PanelProvider } from "./context/PanelContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import Authentication from "./components/authentication/Authentication.jsx";
import Landing from "./components/Landing.jsx";
import Products from "./components/products/Products.jsx";
import Category from "./components/products/Category.jsx";
import Account from "./components/account/Account.jsx";
import Admin from "./Admin.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PanelProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Landing />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route path=":category" element={<Category />} />
                </Route>
                <Route path="admin" element={<Admin />} />
                <Route
                  path="/account"
                  element={<Navigate to="/account/Profile" />}
                />
                <Route path="/account/:section" element={<Account />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PanelProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
