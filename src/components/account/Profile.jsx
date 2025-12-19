import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import {useAuthForm} from "../../Hooks/useAuthForm";
import Select from "react-select";


const Profile = () => {
  const { user } = useContext(AuthContext);
    const { formData,setFormData, handleChange } = useAuthForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
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
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  return (
<div id="profile-container">
<form className="personal-form">
      <h2>YOUR PERSONAL INFORMATIONS</h2>
      <hr/>
      <div className="personal-form-groupe">
        <label>
          First name: <span>*</span>
        </label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>

      <div className="personal-form-groupe">
        <label>
          Last name: <span>*</span>
        </label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
      </div>

      <div className="personal-form-groupe">
        <label>E-mail: <span>*</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange}/>
      </div>
      <div className="personal-row-group">
   <div className="personal-form-groupe">
        <label>Phone number:</label>
        <input type="tel" inputMode="numeric" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
       <div className="personal-form-groupe">
        <label>City:</label>
        <Select options={options} styles={selectStyle} onChange={handleChange} value={formData.city}/>
      </div>
      </div>
    
      <div className="personal-form-groupe">
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange}/>
      </div>
      <button type="submit">Submit</button>
    </form>
</div>
    
  );
};

export default Profile;
