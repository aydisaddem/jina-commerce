import "./footer.css";
const Footer = () => {
    function handleSubscribe(e){
        e.preventDefault()
    }
  return (
    <footer className="footer-container">
      <div className="newspaper">
        <div className="subscribe">
          <p ><i className="fa-regular fa-envelope"></i>Subscribe to our Newsletter</p>
        </div>
        <div>
          <form onSubmit={handleSubscribe} className="news-form">
            <input type="text" placeholder="Email here..." />
            <button onClick={handleSubscribe} type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer">
        <div className="footer-social-icons">
          <a
            target="_blank"
            href="https://linkedin.com/in/saddem-aydi-705402128"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a target="_blank" href="https://github.com/aydisaddem">
            <i className="fa-brands fa-github"></i>
          </a>
          <a target="_blank" href="https://www.facebook.com/sdouma.aydi/">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/saddemaydi/">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <div className="copyright">
          <hr />
          <p className="footer-title">
            © 2025- Jina Fashion All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
