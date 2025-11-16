import React, { useState } from "react";
const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  function toggleForm() {
    setIsLogin(!isLogin);
  }

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
        {isLogin ? (<>
            <h1>Hello, Friend!</h1>
            <p>Create account and start your journey with us</p>
            <button onClick={toggleForm}>SIGN UP</button>
            </>
        ) : ( <>
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
                <input type="email" id="email" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="box">
                <input type="password" id="password" required />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="signUp">
            <form onSubmit={signup}>
              <div className="box">
                <input type="text" id="firstName" required />
                <label htmlFor="firstName">First name</label>
              </div>
              <div className="box">
                <input type="text" id="lastName" required />
                <label htmlFor="lastName">Last name</label>
              </div>
              <div className="box">
                <input type="email" id="signUpEmail" required />
                <label htmlFor="signUpEmail">Email</label>
              </div>
              <div className="box">
                <input type="password" id="signUpPassword" required />
                <label htmlFor="signUpPassword">Password</label>
              </div>
              <div className="box">
                <input type="password" id="confirmPassword" required />
                <label htmlFor="confirmPassword">Confirm password</label>
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
