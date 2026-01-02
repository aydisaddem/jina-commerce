import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import Swal from "sweetalert2";
import PasswordStrengthMeter from "../common/PasswordStrengthMeter.jsx";


const ResetPassword = ({ email, code, onBack }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
    const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
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
      number: /\d/.test(password),
    };
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setStrength(checkPasswordStrength(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // Validate password length
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.newPassword)) {
      setErrors({
        newPassword:
          "Poor password",
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/users/reset-password", {
        email,
        code,
        newPassword: formData.newPassword,
      });
 try {
        await login({ email, password: formData.newPassword });

        const toast = Swal.mixin({
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
              });
              
              toast.fire({
                icon: "success",
                title: "Password Reset Successful!",
              });


        // Small delay for user to see the message
        setTimeout(() => {
          navigate(nav);
        }, 2000);
      } catch (loginError) {
        // If auto-login fails, still show success and redirect to signin
        console.error("Auto-login failed:", loginError);

                const toast = Swal.mixin({
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
              });
              
        
        toast.fire({
          icon: "success",
          title: "Password Reset Successful!",
        }).then(() => {
          navigate("/auth");
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to reset password";

      if (errorMessage.includes("Invalid or expired code")) {
        Swal.fire({
          icon: "error",
          title: "Code Expired",
          text: "Your code has expired. Please request a new one.",
          confirmButtonText: "Start Over",
        }).then(() => {
          onBack();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p>Create your new password</p>

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#f0f9ff",
            borderRadius: "5px",
          }}
        >
          <small style={{ color: "#666" }}>Resetting password for:</small>
          <div style={{ fontWeight: "bold", color: "#333" }}>{email}</div>
        </div>

        <div className="box">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder=" "
            value={formData.newPassword}
            onChange={handlePasswordChange}
            onFocus={showPasswordStrength}
            onBlur={hidePasswordStrength}
            required
          />
          <label htmlFor="newPassword">New Password</label>
          <span className={`error ${errors.newPassword ? "show" : ""}`}>
            ! {errors.newPassword}
          </span>
          <span
            className="password-visibility"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            <i
              className={`fa-solid ${
                !showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            />
          </span>
          
        </div>

        <div className="box">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder=" "
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
           <span className={`error ${errors.confirmPassword ? "show" : ""}`}>
            ! {errors.confirmPassword}
          </span>
          <span
            className="password-visibility"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex="-1"
          >
            <i
              className={`fa-solid ${
                !showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            />
          </span>
         
        </div>
         <div
          className={`password-strength row ${showStrength ? "" : "hidden"}`}
        >
          <PasswordStrengthMeter password={formData.newPassword} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
