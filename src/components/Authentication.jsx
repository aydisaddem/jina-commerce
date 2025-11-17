import React, { useState } from "react";
import Select from "react-select";
import "./authentication.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePassword = () => setShowPassword(!showPassword);
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
      backgroundColor: "#f5f2e7",
      height: "40px",
      margin: "12px 0",
      borderColor: isFocused ? "#525333" : "#dddfe2",
      boxShadow: isFocused ? "0 0 0 1px #525333" : "none",
      "&:hover": {
        borderColor: "#525333",
      },
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#525333"
        : isFocused
        ? "#cf8852"
        : "#f5f2e7",
      color: isSelected ? "#f5f2e7" : isFocused ? "#f5f2e7" : "#1d2129",
      cursor: "pointer",
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
      color: "#525333",
      fontWeight: "bold",
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      backgroundColor: "#525333",
      border: "1px solid #525333",
      borderRadius: "6px",
      marginTop: "4px",
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      backgroundColor: "#f5f2e7",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f5f2e7",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#525333", // slider color
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#525333", // hover color
      },
    }),
  };
  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 8); // limit to 8 digits

    if (digits.length > 5) {
      digits = `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(
        5,
        8
      )}`;
    } else if (digits.length > 2) {
      digits = `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
    }
    setPhone(digits);
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
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setSignUpPassword(value);
    setStrength(checkPasswordStrength(value));
  };
  const calculateStrengthScore = (strength) => {
    let score = 0;
    if (strength.length) score++;
    if (strength.uppercase) score++;
    if (strength.specialChar) score++;
    return score;
  };
  function login(e) {
    e.preventDefault();
    console.log("Login submitted");
  }

  function signup(e) {
    e.preventDefault();
    console.log(e.target.signUpPassword.value);
    const password = e.target.signUpPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Sign Up submitted");
  }

  return (
    <div className={`container ${isLogin ? "login-active" : "signup-active"}`}>
      <div className="overlay-container">
        {isLogin ? (
          <>
            <h1>Hello, Friend!</h1>
            <p>Create account and start your journey with us</p>
            <button onClick={toggleForm}>SIGN UP</button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button onClick={toggleForm}>SIGN IN</button>
          </>
        )}
      </div>

      <div className="forms-container">
        {isLogin ? (
          <div className="signIn">
            <form onSubmit={login}>
              <div className="box">
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
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
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="signUp">
            <form onSubmit={signup}>
              <div className="row">
                <div className="box">
                  <input type="text" id="firstName" placeholder=" " required />
                  <label htmlFor="firstName">First name</label>
                </div>
                <div className="box">
                  <input type="text" id="lastName" placeholder=" " required />
                  <label htmlFor="lastName">Last name</label>
                </div>
              </div>
              <div className="row">
                <div className="box">
                  <input
                    type="email"
                    id="signUpEmail"
                    placeholder="you@example.com"
                    required
                  />
                  <label htmlFor="signUpEmail">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="box">
                  <input
                    type={showSignUpPassword ? "text" : "password"}
                    id="signUpPassword"
                    placeholder=" "
                    value={signUpPassword}
                    onChange={handlePasswordChange}
                    onFocus={showPasswordStrength}
                    onBlur={hidePasswordStrength}
                    required
                  />
                  <label htmlFor="signUpPassword">Password</label>
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
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm password</label>
                </div>
              </div>
              <div
                className={`password-strength row ${
                  showStrength ? "" : "hidden"
                }`}
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
                    {strength.length ? "✔" : "✖"} Minimum 8 characters
                  </p>
                  <p className={strength.uppercase ? "valid" : "invalid"}>
                    {strength.uppercase ? "✔" : "✖"} 1 uppercase
                  </p>
                  <p className={strength.specialChar ? "valid" : "invalid"}>
                    {strength.specialChar ? "✔" : "✖"} at least 1 special
                    character
                  </p>
                </div>
              </div>

              <div className="row2">
                <div className="box">
                  <input
                    type="tel"
                    inputMode="numeric"
                    id="tel"
                    placeholder="XX-XXX-XXX"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  <label htmlFor="tel" id="telLabel">
                    Phone number
                  </label>
                </div>
                <div className="box">
                  <Select
                    options={options}
                    inputId="city"
                    value={selectedCity}
                    onChange={setSelectedCity}
                    placeholder="city..."
                    styles={selectStyle}
                  />
                </div>
              </div>
              <div className="row">
                <div className="box">
                  <input id="address" type="text" placeholder=" " />
                  <label htmlFor="address">Address</label>
                </div>
              </div>

              <button type="submit">SIGN UP</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
