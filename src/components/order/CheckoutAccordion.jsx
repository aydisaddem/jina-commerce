import React, { useState, useContext, useEffect } from "react";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import AddressEntry from "./AddressEntry.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Swal from "sweetalert2";
const CheckoutAccordion = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState(1);
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    vatNumber: "",
    address: "",
    addressComplement: "",
    postalCode: "",
    city: "",
    phone: "",
    useBillingAddress: true,
  });
  const [billingAddress, setBillingAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addAddress, setAddAddress] = useState(false);
  const [editBillingAddress, setEditBillingAddress] = useState(false);
  const [editDeliveryAddress, setEditDeliveryAddress] = useState(false);

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

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (mode, e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (mode === "add") {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (mode === "editBilling") {
      setBillingAddress((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (mode === "editDelivery") {
      setDeliveryAddress((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };


  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.trim() === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill in all required fields before continuing.",
        confirmButtonColor: "#0277bd",
      });
      return;
    }

    if (formData.phone.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number.",
        confirmButtonColor: "#0277bd",
      });
      return;
    }
    const newAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      vatNumber: formData.vatNumber,
      address: formData.address,
      addressComplement: formData.addressComplement,
      postalCode: formData.postalCode,
      city: formData.city,
      phone: formData.phone,
    };
    if (billingAddress) {
      setDeliveryAddress(newAddress);
    } else if (deliveryAddress) {
      setBillingAddress(newAddress);
    } else if (formData.useBillingAddress) {
      setBillingAddress(newAddress);
    } else {
      setDeliveryAddress(newAddress);
    }
  };
 


  const handleDeleteAddress = (type) => {
    Swal.fire({
      title: "Delete Address?",
      text: "Are you sure you want to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "billing") {
          setBillingAddress(null);
        } else if (type === "delivery") {
          setDeliveryAddress(null);
        }
        Swal.fire("Deleted!", "Your address has been deleted.", "success");
      }
      setAddAddress(false);
    });
  };

  return (
    <div className="checkout-container">
      {/* Section 1: Personal Information */}
      <div className="accordion-section">
        <div
          className={`section-header ${activeSection === 1 ? "active" : ""}`}
          onClick={() => toggleSection(1)}
        >
          <span className="section-number">1</span>
          <span className="section-title">Personal Information</span>
        </div>

        {activeSection === 1 && (
          <div className="section-content">
            {isLoggedIn ? (
              <>
                <div className="checkoutLogged">
                  <p>
                    Signed in as {user?.firstName} {user?.lastName}.
                  </p>
                  <p>
                    Not you? <span onClick={logout}>Sign out</span>
                  </p>
                </div>
                <div className="section-footer">
                  <button
                    className="continue-btn"
                    onClick={() => toggleSection(2)}
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <div className="checkoutAuth-container">
                <div className={`checkoutAuth ${!showLogin ? "hidden" : ""}`}>
                  <SignIn nav={0} toggleForm={toggleForm} />
                  <p className="toggle-CheckoutForm">
                    don't have an account yet?{" "}
                    <span onClick={toggleForm}>Create your account »</span>
                  </p>
                </div>
                <div className={`checkoutAuth ${showLogin ? "hidden" : ""}`}>
                  <SignUp nav={0} toggleForm={toggleForm} />
                  <p className="toggle-CheckoutForm">
                    Already have an account?{" "}
                    <span onClick={toggleForm}>Sign in »</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 2: Address */}
      <div className="accordion-section">
        <div
          className={`section-header ${activeSection === 2 ? "active" : ""}`}
          onClick={() => toggleSection(2)}
        >
          <span className="section-number">2</span>
          <span className="section-title">Address</span>
        </div>

        {activeSection === 2 && isLoggedIn && (
          <div className="section-content">
            {billingAddress || deliveryAddress ? (
              <>
                {(!billingAddress || !deliveryAddress) && (
                  <p>
                    The selected address will be used both as a personal address
                    (for billing) and as a delivery address.
                  </p>
                )}

                <div className="address-list">
                  {billingAddress && (
                    <div className="address-summary">
                      <div className="address-header">
                        <div className="address-title">
                          <span className="radio-icon"></span>
                          <h3>Billing address</h3>
                        </div>
                        <div className="address-actions">
                          <button
                            className="action-btn edit-btn"
                            onClick={() =>
                              setEditBillingAddress(!editBillingAddress)
                            }
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteAddress("billing")}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                      {!editBillingAddress ? (
                        <div className="address-content">
                          <p className="address-name">
                            {billingAddress.firstName} {billingAddress.lastName}
                          </p>
                          <p>{billingAddress.address}</p>
                          {billingAddress.addressComplement && (
                            <p>{billingAddress.addressComplement}</p>
                          )}
                          <p>
                            {billingAddress.postalCode} {billingAddress.city}
                          </p>
                          <p>Tunisia</p>
                          <p>{billingAddress.phone}</p>
                        </div>
                      ) : (
                        <AddressEntry
                          mode="editBilling"
                          data={billingAddress}
                          handleChange={handleChange}
                          existingAddress={true}
                          buttonSubmit={()=>setBillingAddress(!billingAddress)}
                        />
                      )}
                    </div>
                  )}

                  {deliveryAddress && (
                    <div className="address-summary">
                      <div className="address-header">
                        <div className="address-title">
                          <span className="radio-icon"></span>
                          <h3>Delivery address</h3>
                        </div>
                        <div className="address-actions">
                          <button
                            className="action-btn edit-btn"
                            onClick={() =>
                              setEditDeliveryAddress(!editDeliveryAddress)
                            }
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteAddress("delivery")}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                      {!editDeliveryAddress ? (
                        <div className="address-content">
                          <p className="address-name">
                            {deliveryAddress.firstName}{" "}
                            {deliveryAddress.lastName}
                          </p>
                          <p>{deliveryAddress.address}</p>
                          {deliveryAddress.addressComplement && (
                            <p>{deliveryAddress.addressComplement}</p>
                          )}
                          <p>
                            {deliveryAddress.postalCode} {deliveryAddress.city}
                          </p>
                          <p>Tunisia</p>
                          <p>{deliveryAddress.phone}</p>
                        </div>
                      ) : (
                        <AddressEntry
                          mode="editDelivery"
                          data={deliveryAddress}
                          handleChange={handleChange}
                          existingAddress={true}
                          buttonSubmit={()=>setEditDeliveryAddress(false)}
                        />
                      )}
                    </div>
                  )}
                </div>

                {(!billingAddress || !deliveryAddress) && (
                  <>
                    <p
                      className="add-address"
                      onClick={() => setAddAddress(!addAddress)}
                    >
                      + add {billingAddress ? "delivery" : "billing"} address
                    </p>
                    {addAddress && (
                      <AddressEntry
                        mode="add"
                        data={formData}
                        handleChange={handleChange}
                        existingAddress={true}
                        buttonSubmit={handleAddressSubmit}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <AddressEntry
                mode="add"
                data={formData}
                handleChange={handleChange}
                buttonSubmit={handleAddressSubmit}
              />
            )}
            <div className="section-footer">
              <button className="continue-btn" onClick={() => toggleSection(3)}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Mode De Livraison */}
      <div className="accordion-section">
        <div
          className={`section-header ${activeSection === 3 ? "active" : ""}`}
          onClick={() => toggleSection(3)}
        >
          <span className="section-number">3</span>
          <span className="section-title">Delivery Method</span>
        </div>

        {activeSection === 3 && (deliveryAddress || billingAddress) && (
          <div className="section-content">
            <p>Livraison options go here...</p>
            <div className="section-footer">
              <button className="continue-btn" onClick={() => toggleSection(4)}>
                Continuer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Paiement */}
      <div className="accordion-section">
        <div
          className={`section-header ${activeSection === 4 ? "active" : ""}`}
          onClick={() => toggleSection(4)}
        >
          <span className="section-number">4</span>
          <span className="section-title">Payment</span>
        </div>

        {activeSection === 4 && (
          <div className="section-content">
            <p>Payment options go here...</p>
            <div className="section-footer">
              <button className="continue-btn">Confirmer la commande</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutAccordion;
