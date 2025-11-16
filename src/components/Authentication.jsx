import React, { useState, useRef } from "react";
const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePassword = () => setShowPassword(!showPassword);

  function login(e) {
    e.preventDefault();
    console.log("Login submitted");
  }

  function signup(e) {
    e.preventDefault();
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
                    type="password"
                    id="signUpPassword"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="signUpPassword">Password</label>
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
              <div className="row">
                <div className="box">
                  <input
                    type="tel"
                    inputmode="numeric"
                    id="tel"
                    placeholder="XX-XXX-XXX"
                  />
                  <label htmlFor="tel" id="telLabel">
                    Phone number
                  </label>
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
