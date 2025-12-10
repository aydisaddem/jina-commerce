import { useState, useContext } from "react";
import { useAuthForm } from "../../Hooks/useAuthForm.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import GoogleAuthButton from "./GoogleAuthButton.jsx";
import Swal from "sweetalert2";

const SignIn = ({ toggleForm }) => {
  const { formData, handleChange } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", formData); 
      const data = response.data;

      // Save tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      toast.fire({
        icon: "success",
        title: `Signed in successfully`,
      });
      login(data.accessToken);
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.error);
        setErrors({ login: error.response.data.error });
      } else {
        console.error("Error logging in:", error.message);
        setErrors({ login: "Something went wrong. Please try again." });
      }
    }
  }

  return (
    <div className="signIn">
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="box">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="box">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <span
            className="password-visibility"
            onClick={togglePassword}
            tabIndex="-1"
          >
            <i
              className={`fa-solid ${
                !showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            />
          </span>
          <span className={`error ${errors.login ? "show" : ""}`}>
            ! {errors.login}
          </span>
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="social-connect">
        <div className="divider">
          <hr />
          <p> Or</p>
          <hr />
        </div>
        <GoogleAuthButton />
      </div>
      <div className="mobile-authentication-toggle">
        <p>don't have an account yet?</p>
        <button type="button" onClick={toggleForm}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default SignIn;
