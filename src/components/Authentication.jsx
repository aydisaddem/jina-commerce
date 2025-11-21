import React, { useState } from "react";
import Select from "react-select";
import "../styles/authentication.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

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
      backgroundColor: "#fff",
      height: "40px",
      margin: "12px 0",
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

    backgroundColor: isSelected ? "#333" : "#000" ,
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
        background: "#000", // slider color
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#000", // hover color
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
  function handleLogin(e) {
    e.preventDefault();
    console.log("Login submitted");
  }
  function validateForm() {
    const result = {};

    result.firstName = firstName.trim() !== "";
    result.lastName = lastName.trim() !== "";
    result.signUpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail);
    result.signUpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      signUpPassword
    );
    result.signUpConfirmPassword = signUpPassword === signUpConfirmPassword;
    result.phone = /\d{2}[-.\s]?\d{3}[-.\s]?\d{3}/.test(phone);
    result.selectedCity = selectedCity.value !== undefined;
    result.address = address.trim() !== "";

    return result;
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation);

    if (Object.values(validation).every(Boolean)) {
      console.log("Form is valid, submit data");
    } else {
      console.log("Validation failed:", validation);
    }
  };

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
            <form onSubmit={handleLogin}>
              <div className="box">
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    // basic email regex
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailRegex.test(e.target.value)) {
                      e.target.setCustomValidity(
                        "Please enter a valid email address"
                      );
                    } else {
                      e.target.setCustomValidity(""); // clear error
                    }
                  }}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="social-connect">
              <div className="divider">
                <hr />
                <p> Or</p>
                <hr />
              </div>
<button id="google">
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
</svg>
  Continue with Google
</button>
            </div>
          </div>
        ) : (
          <div className="signUp">
            <form onSubmit={handleSignup}>
              <div className="row">
                <div className="box">
                  <input
                    type="text"
                    id="firstName"
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <label htmlFor="firstName">First name</label>
                </div>
                <div className="box">
                  <input
                    type="text"
                    id="lastName"
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <label htmlFor="lastName">Last name</label>
                </div>
              </div>
              <div className="row">
                <div className="box">
                  <input
                    type="email"
                    id="signUpEmail"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);

                      if (!errors.signUpEmail) {
                        e.target.setCustomValidity(
                          "Please enter a valid email address"
                        );
                      } else {
                        e.target.setCustomValidity("");
                      }
                    }}
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
                    value={signUpConfirmPassword}
                    onChange={(e) => {
                      setSignUpConfirmPassword(e.target.value);

                      // check match and set custom validity
                      if (!errors.signUpConfirmPassword) {
                        e.target.setCustomValidity("Passwords do not match");
                      } else {
                        e.target.setCustomValidity(""); // clear error
                      }
                    }}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
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
