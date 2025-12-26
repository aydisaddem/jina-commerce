import "../../styles/landing.css";
import MainCarousel from "./MainCarousel";
import BrandCarousel from "./BrandCarousel";
import BestSeller from "./BestSeller";
import phoneIcon from "../../assets/phone-white.png";
import cashIcon from "../../assets/cash-white2.png";
import houseIcon from "../../assets/house-white.png";
const Landing = () => {
  return (
    <div id="landing">
      <MainCarousel />
      <BrandCarousel />
      <BestSeller />
      <div className="service-info">
        <div className="service-item">
          <img src={houseIcon} alt="Home delivery" /> <p>Home delivery</p>
        </div>
        <div className="service-item">
          <img src={phoneIcon} alt="Commercial service" />
          <p>Support <span>44 404 404</span></p>
        </div>
        <div className="service-item">
          <img src={cashIcon} alt="Cash on delivery" />
          <p>Cash on delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
