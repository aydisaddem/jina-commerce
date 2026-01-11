import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { PanelProvider } from "./context/PanelContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import App from "./App.jsx";
import Authentication from "./components/authentication/Authentication.jsx";
import Landing from "./components/landing/Landing.jsx";
import Products from "./components/products/Products.jsx";
import ProductPreview from "./components/products/ProductPreview.jsx";
import Account from "./components/account/Account.jsx";
import Loading from "./components/Loading.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import Order from "./components/order/Order.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PanelProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="loading" element={<Loading />} />
                <Route index element={<Landing />} />
                <Route path="auth" element={<Authentication />} />

                <Route path="order" element={<Order />} />
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route path="search/:search" element={<Products />} />
                  <Route path="brands/:brand" element={<Products />} />
                  <Route path=":category">
                    <Route index element={<Products />} />
                    <Route path="preview/:id" element={<ProductPreview />} />
                    <Route path=":subCategory">
                      <Route index element={<Products />} />
                      <Route path="preview/:id" element={<ProductPreview />} />
                    </Route>
                  </Route>
                </Route>
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
