import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { useAuthForm } from "../../Hooks/useAuthForm";
import Select from "react-select";
import api from "../../utils/api";
import PasswordStrengthMeter from "../common/PasswordStrengthMeter";

const Profile = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { formData, setFormData, handleChange } = useAuthForm({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      width: "100%",
      margin: "12px 0",
      border: "1px solid #dddfe2",
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
        backgroundColor: isSelected ? "#333" : "#000",
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
        background: "#000",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#000",
      },
    }),
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        city: user.city || "",
      }));
    }
  }, [user]);

  const validatePasswordForm = () => {
    const errors = {};
    errors.newPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
      formData.newPassword
    )
      ? null
      : "Poor password ! ";
    errors.confirmPassword =
      formData.newPassword === formData.confirmPassword
        ? null
        : "Passwords do not match !";

    return errors;
  };

  const submitPasswordForm = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validatePasswordForm();
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(
      (err) => err !== null
    );
    if (!hasErrors) {
      const currentPassword = formData.currentPassword;
      const newPassword = formData.newPassword;
      const confirmPassword = formData.confirmPassword;
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const { data } = await api.put(`/users/${user._id}/password`, {
          currentPassword,
          newPassword,
        });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setErrors({});
        alert("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password:", error);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Current password is incorrect"
        ) {
          setErrors({ currentPassword: "Current password is incorrect !" });
          setFormData((prev) => ({ ...prev, currentPassword: "" }));
        } else {
          alert("Failed to update password");
        }
      }
    }
  };

  const validateProfileForm = () => {
    const errors = {};

    errors.firstName =
      formData.firstName.trim() === "" ? "First name is required !" : null;
    errors.lastName =
      formData.lastName.trim() === "" ? "Last name is required !" : null;
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? null
      : "Invalid email format !";
    if (formData.phone.trim() !== "") {
      errors.phone = /\d{2}[-.\s]?\d{3}[-.\s]?\d{3}/.test(formData.phone)
        ? null
        : "Phone must match format 12-345-678";
    } else {
      errors.phone = null;
    }
    return errors;
  };

  const submitProfileForm = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateProfileForm();
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(
      (err) => err !== null
    );

    if (!hasErrors) {
      const fieldsToCompare = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
      ];

      const updates = fieldsToCompare.reduce((acc, key) => {
        if (formData[key] !== user[key]) {
          acc[key] = formData[key];
        }
        return acc;
      }, {});

      if (Object.keys(updates).length === 0) {
        alert("No changes detected");
        return;
      }
      try {
        const { data } = await api.put(`/users/${user._id}`, updates);
        console.log("Profile updated:", data);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
         if (
    error.response &&
    error.response.status === 400 &&
    error.response.data.message === "Email already exists"
  ) {
    setErrors((prev) => ({ ...prev, email: "Email already exists" }));
  } else {
    alert("Failed to update profile");
  }
      }
    }
  };

  const handleDiscard = () => {
  if (user) {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      address: user.address || "",
      phone: user.phone || "",
      city: user.city || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({}); 
  }
};

  return (
    <div id="profile-container">
      <h3>YOUR PERSONAL INFORMATIONS</h3>
      <hr />
      <div id="personal-form-container">
        <div id="profile-buttons-toggle">
          <button
            onClick={() => setToggleForm(false)}
            className={`${!toggleForm ? "active-button" : ""}`}
          >
            profile
          </button>
          <button
            onClick={() => setToggleForm(true)}
            className={`${toggleForm ? "active-button" : ""}`}
          >
            password
          </button>
        </div>
        {!toggleForm ? (
          <form className="personal-form" onSubmit={submitProfileForm}>
            <div className="personal-form-groupe">
              <label>
                First name : <span>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <span
                className={`profile-error ${errors.firstName ? "show" : ""}`}
              >
                {errors.firstName}
              </span>
            </div>

            <div className="personal-form-groupe">
              <label>
                Last name : <span>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <span
                className={`profile-error ${errors.lastName ? "show" : ""}`}
              >
                {errors.lastName}
              </span>
            </div>

            <div className="personal-form-groupe">
              <label>
                E-mail : <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className={`profile-error ${errors.email ? "show" : ""}`}>
                {errors.email}
              </span>
            </div>
            <div className="personal-row-group">
              <div className="personal-form-groupe">
                <label>Phone number :</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <span
                className={`profile-error ${errors.phone ? "show" : ""}`}
              >
                {errors.phone}
              </span>
              </div>
              <div className="personal-form-groupe">
                <label>City :</label>
                <Select
                  options={options}
                  styles={selectStyle}
                  name="city"
                  onChange={handleChange}
                  value={
                    options.find((opt) => opt.value === formData.city) || null
                  }
                />
              </div>
            </div>

            <div className="personal-form-groupe">
              <label>Address :</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="profile-buttons-container">
          <button type="button" className="profile-discard-btn" onClick={handleDiscard}>Discard Changes</button>
            <button type="submit" className="profile-submit-btn">Submit</button>
            </div>
            
          </form>
        ) : (
          <form className="personal-form" onSubmit={submitPasswordForm}>
            <div className="personal-form-groupe">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <span
                className={`profile-error ${
                  errors.currentPassword ? "show" : ""
                }`}
              >
                {errors.currentPassword}
              </span>
            </div>
            <div className="personal-form-groupe">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <span
                className={`profile-error ${errors.newPassword ? "show" : ""}`}
              >
                {errors.newPassword}
              </span>
            </div>
            <div className="personal-form-groupe">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className={`profile-error ${
                  errors.confirmPassword ? "show" : ""
                }`}
              >
                {errors.confirmPassword}
              </span>
            </div>
            <div className="strength-container">
              <PasswordStrengthMeter password={formData.newPassword} />
            </div>
            <div className="profile-buttons-container">
<button type="button" className="profile-discard-btn" onClick={handleDiscard}>clear</button>
            <button type="submit" className="profile-submit-btn">Update Password</button>
            </div>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
