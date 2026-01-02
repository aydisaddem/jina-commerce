import { useState } from "react";
import api from "../../utils/api.js";
import Swal from "sweetalert2";

const ForgotPassword = ({ onCodeSent, toggleForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/users/forgot-password", { email });
      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      
      toast.fire({
        icon: "success",
        title: "Password reset code sent to your email",
      });
      onCodeSent(email);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to send reset link",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset code</p>
        
        <div className="box">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send code"}
        </button>
        <div style={{ textAlign: "start"}}>
       <span className="back-span"  onClick={toggleForgotPassword}>
        &lt; Back
        </span>
        </div>
        
      </form>

    </div>
  );
};

export default ForgotPassword;