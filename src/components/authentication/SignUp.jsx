import { useState } from "react";
import Select from "react-select";
import { useAuthForm } from "../../Hooks/useAuthForm.js";

const SignUp = ({ toggleForm }) => {
  const { formData, handleChange } = useAuthForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });

  const toggleSignUpPassword = () => setShowSignUpPassword(!showSignUpPassword);

  const options = [
    { value: "tunis", label: "Tunis" },
    { value: "sfax", label: "Sfax" },
    { value: "sousse", label: "Sousse" },
    { value: "kairouan", label: "Kairouan" },
    { value: "gabès", label: "Gabès" },
    { value: "bizerte", label: "Bizerte" },
    { value: "ariana", label: "Ariana" },
    { value: "gafsa", label: "Gafsa" },
    { value: "monastir", label: "Monastir" },
    { value: "mahdia", label: "Mahdia" },
    { value: "nabeul", label: "Nabeul" },
    { value: "zarzis", label: "Zarzis" },
    { value: "tozeur", label: "Tozeur" },
    { value: "kebili", label: "Kebili" },
    { value: "tataouine", label: "Tataouine" },
    { value: "medenine", label: "Medenine" },
    { value: "siliana", label: "Siliana" },
    { value: "jendouba", label: "Jendouba" },
    { value: "béja", label: "Béja" },
    { value: "le Kef", label: "Le Kef" },
    { value: "ben Arous", label: "Ben Arous" },
    { value: "manouba", label: "Manouba" },
  ];
  const selectStyle = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "#fff",
      height: "40px",
      width: "100%",
      margin: "12px 0",
      border: "2px solid #dddfe2",
      borderColor: isFocused ? "#708090" : "#dddfe2",
      boxShadow: isFocused ? "0 0 0 1px #708090" : "none",
      "&:hover": {
        borderColor: "#708090",
      },
      "&:active": {
        borderColor: "#000",
      },
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#000" : isFocused ? "#ef0200" : "#fff",

      color: isSelected ? "#fff" : isFocused ? "#fff" : "#1d2129",
      cursor: "pointer",
      "&:active": {
        backgroundColor: isSelected ? "#333" : "#000",
        color: "#fff",
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      alignItems: "center",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      padding: "4px",
      display: "flex",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#1d2129",
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 5px",
    }),
    placeholder: (styles) => ({
      ...styles,
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#ef0200",
      border: "1px solid #708090",
      borderRadius: "6px",
      marginTop: "4px",
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      backgroundColor: "#fff",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#fff",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#000",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#000",
      },
    }),
  };
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
      specialChar: /[^A-Za-z0-9]/.test(password),
    };
  };
  const calculateStrengthScore = (strength) => {
    let score = 0;
    if (strength.length) score++;
    if (strength.uppercase) score++;
    if (strength.specialChar) score++;
    return score;
  };
  const handlePasswordChange = (e) => {
    handleChange(e);
    setStrength(checkPasswordStrength(e.target.value));
  };

  function validateForm() {
    const errors = {};

    errors.firstName =
      formData.firstName.trim() === "" ? "First name is required" : null;
    errors.lastName =
      formData.lastName.trim() === "" ? "Last name is required" : null;
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? null
      : "Invalid email format";
    errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      formData.password
    )
      ? null
      : "Password must be 8+ chars, include uppercase, lowercase, and a number";
    errors.confirmPassword =
      formData.password === formData.confirmPassword
        ? null
        : "Passwords do not match";
    errors.phone = /\d{2}[-.\s]?\d{3}[-.\s]?\d{3}/.test(formData.phone)
      ? null
      : "Phone must match format 12-345-678";
    errors.selectedCity = formData.city?.value ? null : "Please select a city";
    errors.address =
      formData.address.trim() === "" ? "Address is required" : null;

    return errors;
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(
      (err) => err !== null
    );
    if (!hasErrors) {
      console.log("Form submitted successfully!", formData);
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={handleSignup}>
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
            <label htmlFor="firstName">First name <span className={
    errors.firstName ? "error-star" : "valid-star"}>*</span></label>
            <span className={`error ${errors.firstName ? "show" : ""}`}>
   ! {errors.firstName}
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
            <label htmlFor="lastName">Last name <span className={
    errors.lastName ? "error-star" : "valid-star"}>*</span></label>

            <span className={`error ${errors.lastName ? "show" : ""}`}>
   ! {errors.lastName}
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
            <label htmlFor="signUpEmail">Email <span className={
    errors.email ? "error-star" : "valid-star"}>*</span></label>
             <span className={`error ${errors.email ? "show" : ""}`}>
   ! {errors.email}
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

            <label htmlFor="signUpPassword">Password <span className={
    errors.password ? "error-star" : "valid-star"}>*</span></label>
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm password <span className={
    errors.confirmPassword ? "error-star" : "valid-star"}>*</span></label>
             <span className={`error ${errors.confirmPassword ? "show" : ""}`}>
   ! {errors.confirmPassword}
  </span>
          </div>
        </div>
        <div
          className={`password-strength row ${showStrength ? "" : "hidden"}`}
        >
          <div className="strength-meter">
            <div className="strength-bar">
              <div
                className={`strength-fill score-${calculateStrengthScore(
                  strength
                )}`}
              />
            </div>
            <span
              className={`strength-label score-${calculateStrengthScore(
                strength
              )}`}
            >
              {calculateStrengthScore(strength) === 1 && "Weak"}
              {calculateStrengthScore(strength) === 2 && "Medium"}
              {calculateStrengthScore(strength) === 3 && "Strong"}
            </span>
          </div>

          <div className="strength-rules">
            <p className={strength.length ? "valid" : "invalid"}>
              {strength.length ? "✔" : "✖"} 8 characters
            </p>
            <p className={strength.uppercase ? "valid" : "invalid"}>
              {strength.uppercase ? "✔" : "✖"} 1 uppercase
            </p>
            <p className={strength.specialChar ? "valid" : "invalid"}>
              {strength.specialChar ? "✔" : "✖"} 1 special character
            </p>
          </div>
        </div>

        <div className="row-contact">
          <div className="box">
            <input
              type="tel"
              inputMode="numeric"
              id="tel"
              placeholder="XX-XXX-XXX"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="tel" id="telLabel">
              Phone number <span className={
    errors.phone ? "error-star" : "valid-star"}>*</span>
            </label>
             <span className={`error ${errors.phone ? "show" : ""}`}>
   ! {errors.phone}
  </span>
          </div>
          <div className="box">
            <Select
              options={options}
              inputId="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="city..."
              styles={selectStyle}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="box">
            <input
              id="address"
              type="text"
              placeholder=" "
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label htmlFor="address">Address <span className={
    errors.address ? "error-star" : "valid-star"}>*</span></label>
             <span className={`error ${errors.address ? "show" : ""}`}>
    ! {errors.address}
  </span>
          </div>
        </div>

        <button type="submit">SIGN UP</button>
      </form>
      <div className="mobile-authentication-toggle">
        <p>Already have an account?</p>
        <button type="button" onClick={toggleForm}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
