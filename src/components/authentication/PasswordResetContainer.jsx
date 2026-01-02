import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";

const PasswordResetContainer = ({ toggleForgotPassword, nav }) => {
  const [step, setStep] = useState("email"); // "email", "code", or "reset"
  const [email, setEmail] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");

  const handleCodeSent = (userEmail) => {
    setEmail(userEmail);
    setStep("code");
  };

  const handleCodeVerified = (code) => {
    setVerifiedCode(code);
    setStep("reset");
  };

  const handleBack = () => {
    if (step === "code") {
      setStep("email");
      setEmail("");
    } else if (step === "reset") {
      setStep("code");
      setVerifiedCode("");
    }
  };

  return (
    <div className="password-reset-container">
      {step === "email" ? (
        <ForgotPassword 
          onCodeSent={handleCodeSent}
          toggleForgotPassword={toggleForgotPassword}
        />
      ) : step === "code" ? (
        <VerifyCode 
          email={email}
          onBack={handleBack}
          onCodeVerified={handleCodeVerified}
        />
      ) : (
        <ResetPassword 
          email={email}
          code={verifiedCode}
          onBack={handleBack}
          nav={nav}
        />
      )}
    </div>
  );
};

export default PasswordResetContainer;