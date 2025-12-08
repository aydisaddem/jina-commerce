import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function GoogleAuthButton() {
  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      await loginWithGoogle(credential);
      navigate(-1);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error("❌ Google Login Failed")}
      theme="outline"
      size="large"
      text="signin_with"
      shape="rectangular"
    />
  );
}

export default GoogleAuthButton;
