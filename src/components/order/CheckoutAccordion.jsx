import React, { useState, useContext, useEffect } from "react";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import AddressEntry from "./AddressEntry.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Swal from "sweetalert2";
const CheckoutAccordion = ({ panel, total, count }) => {
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
  const [validatedSections, setValidatedSections] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("carrier");
  const [deliveryNote, setDeliveryNote] = useState("");
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
      setValidatedSections([...validatedSections, 1]);
    } else {
      setValidatedSections(
        validatedSections.filter((section) =>section !== 1 && section !== 2 && section !== 3)
      );
    }
    
  }, [user]);

  useEffect(() => {
    if (billingAddress || deliveryAddress) {
      if (!validatedSections.includes(2)) {
        setValidatedSections([...validatedSections, 2]);
      }
    } else {
      setValidatedSections(
        validatedSections.filter((section) => section !== 2 && section !== 3)
      );
    }
  }, [billingAddress, deliveryAddress]);

  const isSectionValidated = (section) => {
    return validatedSections.includes(section);
  };
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleEdit = (target) => {
    if (target === "billing") {
      setFormData((prev) => ({ ...prev, ...billingAddress }));
      setEditBillingAddress(!editBillingAddress);
    } else if (target === "delivery") {
      setFormData((prev) => ({ ...prev, ...deliveryAddress }));
      setEditDeliveryAddress(!editDeliveryAddress);
    }
  };

  const applyEdit = (mode, e) => {
    e.preventDefault();
    handleAddressSubmit(mode, e);
    if (mode === "editBilling") {
      setEditBillingAddress(!editBillingAddress);
    }
    if (mode === "editDelivery") {
      setEditDeliveryAddress(!editDeliveryAddress);
    }
  };

  const cancelEdit = (mode, e) => {
    e.preventDefault();
    if (mode === "editBilling") {
      setEditBillingAddress(!editBillingAddress);
    } else if (mode === "editDelivery") {
      setEditDeliveryAddress(!editDeliveryAddress);
    }
  };

  const handleAddressSubmit = (mode, e) => {
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
    if (mode === "add") {
      if (billingAddress) {
        setDeliveryAddress(newAddress);
      } else if (deliveryAddress) {
        setBillingAddress(newAddress);
      } else if (formData.useBillingAddress) {
        setBillingAddress(newAddress);
      } else {
        setDeliveryAddress(newAddress);
      }
    } else if (mode === "editBilling") {
      setBillingAddress((prev) => ({ ...prev, ...formData }));
    } else {
      setDeliveryAddress((prev) => ({ ...prev, ...formData }));
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
          <span
            className={`section-number ${
              isSectionValidated(1) ? "validated" : ""
            }`}
          >
            {isSectionValidated(1) ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              "1"
            )}
          </span>
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
          <span
            className={`section-number ${
              isSectionValidated(2) ? "validated" : ""
            }`}
          >
            {isSectionValidated(2) ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              "2"
            )}
          </span>
          <span className="section-title">Address</span>
        </div>

        {activeSection === 2 && isSectionValidated(1) && (
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
                            className="address-action-btn edit-btn"
                            onClick={() => handleEdit("billing")}
                            disabled={editDeliveryAddress}
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="address-action-btn delete-btn"
                            onClick={() => handleDeleteAddress("billing")}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                      {!editBillingAddress ? (
                        <div className="address-content">
                          <p>
                            <span>Fullname: </span>
                            {billingAddress.firstName} {billingAddress.lastName}
                          </p>
                          {billingAddress.company && (
                            <p>
                              <span>Company: </span>
                              {billingAddress.company}
                            </p>
                          )}
                          {billingAddress.vatNumber && (
                            <p>
                              <span>VAT number: </span>
                              {billingAddress.vatNumber}
                            </p>
                          )}

                          <p>
                            <span>Address: </span>
                            {billingAddress.address}
                          </p>
                          {billingAddress.addressComplement && (
                            <p>
                              <span>Address complement: </span>
                              {billingAddress.addressComplement}
                            </p>
                          )}

                          {billingAddress.postalCode && (
                            <p>
                              <span>Postal code: </span>
                              {billingAddress.postalCode}
                            </p>
                          )}
                          <p>
                            <span>City: </span>
                            {billingAddress.city}
                          </p>
                          <p>
                            <span>Phone number: </span>
                            {billingAddress.phone}
                          </p>
                        </div>
                      ) : (
                        <AddressEntry
                          mode="editBilling"
                          data={formData}
                          handleChange={handleChange}
                          existingAddress={true}
                          buttonSubmit={applyEdit}
                          cancelEdit={cancelEdit}
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
                            className="address-action-btn edit-btn"
                            onClick={() => handleEdit("delivery")}
                            disabled={editBillingAddress}
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </button>
                          <button
                            className="address-action-btn delete-btn"
                            onClick={() => handleDeleteAddress("delivery")}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                      {!editDeliveryAddress ? (
                        <div className="address-content">
                          <p>
                            {" "}
                            <span>Fullname: </span>
                            {deliveryAddress.firstName}{" "}
                            {deliveryAddress.lastName}
                          </p>
                          {deliveryAddress.company && (
                            <p>
                              <span>Company: </span>
                              {deliveryAddress.company}
                            </p>
                          )}
                          {deliveryAddress.vatNumber && (
                            <p>
                              <span>VAT number: </span>
                              {deliveryAddress.vatNumber}
                            </p>
                          )}
                          <p>
                            {" "}
                            <span>Address: </span>
                            {deliveryAddress.address}
                          </p>
                          {deliveryAddress.addressComplement && (
                            <p>
                              <span>Address complement: </span>
                              {deliveryAddress.addressComplement}
                            </p>
                          )}
                          {deliveryAddress.postalCode && (
                            <p>
                              <span>Postal code: </span>
                              {deliveryAddress.postalCode}
                            </p>
                          )}
                          <p>
                            <span>City: </span>
                            {deliveryAddress.city}
                          </p>
                          <p>
                            {" "}
                            <span>Phone number: </span>
                            {deliveryAddress.phone}
                          </p>
                        </div>
                      ) : (
                        <AddressEntry
                          mode="editDelivery"
                          data={formData}
                          handleChange={handleChange}
                          existingAddress={true}
                          buttonSubmit={applyEdit}
                          cancelEdit={cancelEdit}
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

      {/* Section 3: Delivery method */}
      <div className="accordion-section">
        <div
          className={`section-header ${activeSection === 3 ? "active" : ""}`}
          onClick={() => toggleSection(3)}
        >
          <span
            className={`section-number ${
              isSectionValidated(3) ? "validated" : ""
            }`}
          >
            {isSectionValidated(3) ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              "3"
            )}
          </span>
          <span className="section-title">Delivery Method</span>
        </div>

        {activeSection === 3 && isSectionValidated(2) && (
          <div className="section-content">
            <label className="delivery-option">
              <input
                type="radio"
                className="delivery-radio"
                name="delivery"
                value="store"
                checked={deliveryOption === "store"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <div className="delivery-text">
                <span>Store Pickup</span>
                <span>Sfax - Route Gremda km 9</span>
                <span>Free</span>
              </div>
            </label>

            <label className="delivery-option">
              <input
                type="radio"
                className="delivery-radio"
                name="delivery"
                value="carrier"
                checked={deliveryOption === "carrier"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <div className="delivery-text">
                <span>Carrier - All of Tunisia</span>{" "}
                <span>
                  Cash on delivery. Free delivery for purchases over 300 DT
                </span>
                <span>{total > 300 ? "Free" : "10 DT"}</span>
              </div>
            </label>

            <div className="delivery-message">
              <label htmlFor="orderMessage" className="message-label">
                If you’d like to add a note about your order, please type it in
                the field below{" "}
              </label>
              <textarea
                id="orderMessage"
                className="message-textarea"
                name="orderMessage"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
              ></textarea>
            </div>

            <div className="section-footer">
              <button
                className="continue-btn"
                onClick={() => {
                  toggleSection(4);
                  setValidatedSections([...validatedSections, 3]);
                }}
              >
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
          <span
            className={`section-number ${
              isSectionValidated(4) ? "validated" : ""
            }`}
          >
            {isSectionValidated(4) ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              "4"
            )}
          </span>
          <span className="section-title">Payment</span>
        </div>

        {activeSection === 4 && isSectionValidated(3) && (
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
