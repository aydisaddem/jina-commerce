import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../../styles/authentication.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div id="auth">
      <div
        className={`container ${isLogin ? "login-active" : "signup-active"}`}
      >
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
            <SignIn toggleForm={toggleForm} nav={-1}  />
          ) : (
            <SignUp toggleForm={toggleForm} nav={-1} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
