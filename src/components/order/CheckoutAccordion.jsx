import React, { useState, useContext } from "react";
import SignIn from "../authentication/SignIn";
import SignUp from "../authentication/SignUp";
import { AuthContext } from "../../context/AuthContext.jsx";

const CheckoutAccordion = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState(1);
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="checkout-container">
      {/* Section 1: Informations Personnelles */}
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
            {isLoggedIn? (<div className="checkoutLogged">
                <p>Signed in as {user?.firstName} {user?.lastName}.</p>
                <p>Not you? <span onClick={logout}>Sign out</span></p>
            </div>) : (<div className="checkoutAuth-container">
               <div className={`checkoutAuth ${!showLogin ? "hidden" : ""}`}>
              <SignIn nav={0} toggleForm={toggleForm}/>
              <p className="toggle-CheckoutForm">
                don't have an account yet?{" "}
                <span onClick={toggleForm}>
                  Create your account »
                </span>
              </p>
            </div>
            <div className={`checkoutAuth ${showLogin ? "hidden" : ""}`}>
              <SignUp nav={0} toggleForm={toggleForm} />
              <p className="toggle-CheckoutForm">
                Already have an account?{" "}
                <span onClick={toggleForm}>Sign in »</span>
              </p>
            </div>
            </div>)}
         
          </div>
        )}
      </div>

      {/* Section 2: Adresses */}
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
            <p>Adresse content goes here...</p>
            <div className="section-footer">
              <button className="continue-btn" onClick={() => toggleSection(3)}>
                Continuer
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

        {activeSection === 3 && (
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
