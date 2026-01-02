import { createContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api.js"; 


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Save tokens in localStorage
  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
  };

  // Standard JWT login
  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/users/login", credentials);
      saveTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  // Google login
  const loginWithGoogle = async (googleToken) => {
    try {
      const { data } = await api.post("/users/google-login", {
        token: googleToken,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsLoggedIn(true);
      setUser(data.user);
    } catch (error) {
      console.error(
        "Google login failed:",
        error.response?.data || error.message
      );
    }
  };
  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
      const { data } = await api.post("/users/refresh", {
        token: refreshToken,
      });
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      return data.accessToken;
    } catch (err) {
      console.error("Refresh failed", err);
      logout();
      return null;
    }
  }, [logout]);

  // Auto-refresh on mount
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
        await refresh();
      }
    })();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        loading,
        login,
        loginWithGoogle,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
