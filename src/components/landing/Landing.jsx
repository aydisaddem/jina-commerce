import "../../styles/landing.css";
import MainCarousel from "./MainCarousel";
import BrandCarousel from "./BrandCarousel";
import BestSeller from "./BestSeller";
import phoneIcon from "../../assets/phone-white.png";
import cashIcon from "../../assets/cash-white2.png";
import houseIcon from "../../assets/house-white.png";
import { useSEO } from "../../Hooks/useSEO";
const Landing = () => {
  
  useSEO({
    title: 'JINA SHOP - Electronics Store in Tunisia | Home Delivery',
    description: 'Shop the latest electronics in Tunisia at JINA SHOP. Computers, phones, tablets with home delivery nationwide. Pay on delivery available.',
    canonical: 'https://jinashop.netlify.app/'
  });
  return (
    <div id="landing">
      <h1 className="visually-hidden">
        JINA SHOP - Electronics Store in Tunisia | Phones, Computers & Home
        Delivery
      </h1>

      <MainCarousel />
      <BrandCarousel />
      <BestSeller />
      <div className="service-info">
        <div className="service-item">
          <img src={houseIcon} alt="Home delivery" loading="lazy"/>{" "}
          <p>
            HOME DELIVERY <span>Delivery service covers all of Tunisia.</span>
          </p>
        </div>
        <div className="service-item">
          <img src={phoneIcon} alt="Commercial service" loading="lazy" />
          <p>
            SUPPORT 24/7<span>Contact us 24 hours a day, 7 days a week.</span>
          </p>
        </div>
        <div className="service-item">
          <img src={cashIcon} alt="Cash on delivery" loading="lazy"/>
          <p>
            PAY ON DELIVERY <span>Settle only when your package arrives.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
