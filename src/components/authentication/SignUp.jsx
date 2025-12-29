import { useState, useContext } from "react";
import { useAuthForm } from "../../Hooks/useAuthForm.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import PasswordStrengthMeter from "../common/PasswordStrengthMeter.jsx";
import api from "../../utils/api.js";
import Swal from "sweetalert2";

const SignUp = ({ toggleForm, nav }) => {
  const { formData, handleChange } = useAuthForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    orders: [],
    wishlist: [],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const toggleSignUpPassword = () => setShowSignUpPassword(!showSignUpPassword);

  const showPasswordStrength = () => {
    setShowStrength(true);
  };
  const hidePasswordStrength = (e) => {
    if (e.target.value.length === 0) {
      setShowStrength(false);
    }
  };

  const checkPasswordStrength = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    };
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setStrength(checkPasswordStrength(e.target.value));
  };

  function validateForm() {
    const errors = {};

    errors.firstName =
      formData.firstName.trim() === "" ? "First name is required !" : null;
    errors.lastName =
      formData.lastName.trim() === "" ? "Last name is required !" : null;
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? null
      : "Invalid email format !";
    errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      formData.password
    )
      ? null
      : "Poor password !";
    errors.confirmPassword =
      formData.password === confirmPassword ? null : "Passwords do not match !";

    return errors;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log()
    setErrors({});
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (err) => err !== null
    );
        

    if (!hasErrors) {
      try {
        const response = await api.post("/users/signUp", formData);
        const data = response.data;
        // Save access token
        localStorage.setItem("accessToken", data.accessToken);

        const toast = Swal.mixin({
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          showClass: {
            popup: "",
          },
          hideClass: {
            popup: "",
          },
        });
        toast.fire({
          icon: "success",
          title: `Welcome, ${formData.firstName}! Your account has been created successfully.`,
        });
        await login({ email: formData.email, password: formData.password });
        navigate(nav !== undefined ? nav : -1);

      } catch (error) {
        if (error.response) {
          console.error("Signup failed:", error.response.data.error);
          setErrors({ email: error.response.data.error });
        } else {
          console.error("Error creating user:", error.message);
          setErrors({ email: "Something went wrong. Please try again." });
        }
      }
    }
  };

  return (
    <div className="signUp">
      <form className="auth-form" onSubmit={handleSignup}>
        <div className="row">
          <div className="box">
            <input
              type="text"
              id="firstName"
              placeholder=" "
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor="firstName">
              First name{" "}
              <span className={errors.firstName ? "error-star" : "valid-star"}>
                *
              </span>
            </label>
            <span className={`error ${errors.firstName ? "show" : ""}`}>
              {errors.firstName}
            </span>
          </div>

          <div className="box">
            <input
              type="text"
              id="lastName"
              placeholder=" "
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">
              Last name{" "}
              <span className={errors.lastName ? "error-star" : "valid-star"}>
                *
              </span>
            </label>

            <span className={`error ${errors.lastName ? "show" : ""}`}>
              {errors.lastName}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="box">
            <input
              type="email"
              id="signUpEmail"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="signUpEmail">
              Email{" "}
              <span className={errors.email ? "error-star" : "valid-star"}>
                *
              </span>
            </label>
            <span className={`error ${errors.email ? "show" : ""}`}>
              {errors.email}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="box">
            <input
              type={showSignUpPassword ? "text" : "password"}
              id="signUpPassword"
              placeholder=" "
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              onFocus={showPasswordStrength}
              onBlur={hidePasswordStrength}
              required
            />

            <label htmlFor="signUpPassword">
              Password{" "}
              <span className={errors.password ? "error-star" : "valid-star"}>
                *
              </span>
            </label>
            <span className={`error ${errors.password ? "show" : ""}`}>
              {errors.password}
            </span>
            <span
              className="password-visibility"
              onClick={toggleSignUpPassword}
              tabIndex="-1"
            >
              <i
                className={`fa-solid ${
                  !showSignUpPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              />
            </span>
          </div>
          <div className="box">
            <input
              type="password"
              id="confirmPassword"
              placeholder=" "
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">
              Confirm password{" "}
              <span
                className={errors.confirmPassword ? "error-star" : "valid-star"}
              >
                *
              </span>
            </label>
            <span className={`error ${errors.confirmPassword ? "show" : ""}`}>
              {errors.confirmPassword}
            </span>
          </div>
        </div>

        <div
          className={`password-strength row ${showStrength ? "" : "hidden"}`}
        >
          <PasswordStrengthMeter password={formData.password} />
        </div>

        <button type="submit">SIGN UP</button>
      </form>

      <div className="mobile-authentication-toggle">
        <p>Already have an account? <span onClick={toggleForm}>Sign In</span></p>
      </div>
    </div>
  );
};

export default SignUp;
