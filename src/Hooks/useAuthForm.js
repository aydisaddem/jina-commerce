import React, { useState } from "react";

export function useAuthForm(initialState = { email: "", password: "", phone: "" }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (eOrOption, actionMeta) => {
    // Case 1: normal input event
    if (eOrOption?.target) {
      const { name, value, type } = eOrOption.target;

      // Special case: phone input formatting
      if (name === "phone") {
        let digits = value.replace(/\D/g, "").slice(0, 8);

        if (digits.length > 5) {
          digits = `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5, 8)}`;
        } else if (digits.length > 2) {
          digits = `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
        }
        setFormData((prev) => ({ ...prev, phone: digits }));
      } 
      // Normal inputs (email, password, etc.)
      else {
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? eOrOption.target.checked : value,
        }));
      }
    }
    // Case 2: react-select
    else if (actionMeta) {
      setFormData((prev) => ({ ...prev, [actionMeta.name]: eOrOption }));
    }
  };

  const resetForm = () => setFormData(initialState);

  return { formData, handleChange, setFormData, resetForm };
}
