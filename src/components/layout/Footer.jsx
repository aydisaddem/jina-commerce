import "../../styles/footer.css";
import api from "../../utils/api.js";
import { useState } from "react";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = (email) => {
    setEmail(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validate) {
      Swal.fire({
        title: "Invalid Email Address",
        text: "Please enter a valid email address.",
        icon: "warning",
        confirmButtonColor: "#121117",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await api.post("/newspaper/joinUs", { email });
      Swal.mixin({
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      }).fire({
        icon: "success",
        title: response.data,
      });
      setEmail("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";

      Swal.fire({
        title: "Subscription Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#121117",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <footer className="footer-container">
      <div className="newspaper">
        <div className="subscribe">
          <p>
            <i className="fa-regular fa-envelope"></i>Subscribe to our
            Newsletter
          </p>
        </div>
        <div>
          <form onSubmit={handleSubscribe} className="news-form">
            <input
              type="text"
              placeholder="Email here..."
              value={email}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button onClick={handleSubscribe} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="footer">
        <div className="footer-main-section">
          <div className="footer-contact">
            <h3>Contact</h3>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i>Route Mahdia KM 9
                -3054 SFAX{" "}
              </li>
              <li>
                <i className="fa-regular fa-envelope"></i>sdouma91@gmail.com
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>56120796
              </li>
            </ul>
          </div>
          <div className="footer-services">
            <h3>Services</h3>
            <ul>
              <li>
                <a>About us</a>
              </li>
              <li>
                <a>Delivery</a>
              </li>
              <li>
                <a>Conditions of sale</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <div className="personel-account">
            <h3>your account</h3>
            <ul>
              <li>
                <a>Personal informations</a>
              </li>
              <li>
                <a>Orders</a>
              </li>
              <li>
                <a>Addresses</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>social accounts</h3>
            <p>Follow us on</p>
            <div className="footer-social-icons">
              <a
                target="_blank"
                href="https://www.facebook.com/sdouma.aydi/"
                className="facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/saddemaydi/"
                className="instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="copyright">
          <hr />
          <p>
            Copyright © 2025 - JINA COMMERCE Tunisie. Developped by Aydi Saddem
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
