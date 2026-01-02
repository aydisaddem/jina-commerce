import { useState } from "react";
import api from "../../utils/api.js";
import Swal from "sweetalert2";

const VerifyCode = ({ email, onBack, onCodeVerified }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(numericValue);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users/verify-reset-code", {
        email,
        code,
      });

      // Move to password reset step
      onCodeVerified(code);
    } catch (error) {
      console.error("Error verifying code:", error);

      const errorMessage =
        error.response?.data?.message || "Invalid or expired code";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      await api.post("/forgot-password", { email });

      const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });

      toast.fire({
        icon: "success",
        title: "New code sent to your email",
      });

      setCode("");
      setError("");
    } catch (error) {
      console.error("Error resending code:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to resend code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-code">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Verify Code</h2>
        <p>Enter the 6-digit code sent to:</p>
        <p style={{ fontWeight: "bold", marginBottom: "20px" }}>{email}</p>

        <div className="box">
          <input
            type="text"
            id="code"
            name="code"
            placeholder="000000"
            value={code}
            onChange={handleChange}
            maxLength={6}
            pattern="\d{6}"
            required
            autoComplete="off"
            style={{
              letterSpacing: "10px",
              fontSize: "28px",
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          />
          <label htmlFor="code">Verification Code</label>
          <span className={`error ${error ? "show" : ""}`}>! {error}</span>
        </div>

        <button type="submit" disabled={loading || code.length !== 6}>
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <div className="code-actions" style={{ marginTop: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <p>
              Didn't receive the code? <span>Resend</span>
            </p>
          </div>

          <div style={{textAlign: "center" }}>
            <span
              onClick={onBack}
              className="back-span"
            >
              &lt; Back
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyCode;
