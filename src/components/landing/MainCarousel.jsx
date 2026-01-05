import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { brands } from "../../data/brands";
import {slugify} from "../../utils/slugify"
import "swiper/css";
import "swiper/css/pagination";


const MainCarousel = () => {
  const promos = [
        {
      titleLines: ["GALAXY S25 ULTRA"],
      desc: "Engineered for Ultra Intelligence — Experience the Power of 6G ",
      note: "2-Year Warranty",
      image:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766599051/Jina/ex8nqynwuniaxx2bnd89.png",
      bgColor: "#161618",
      cta: "Discover More",
      brand: brands.SAMSUNG,
      logoStyle: { width: "200px", height: "100px" },
      link: "products/search/Galaxy-S25",
    },
        {
      titleLines: ["IPHONE 17"],
      desc: "Engineered for Apple Intelligence. ",
      note: "2-Year Warranty",
      image:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766600698/Jina/lihfv26rsidyn8obd3ce.png",
      bgColor: "#171719",
      cta: "Discover More",
      brand: brands.APPLE,
      logoStyle: { width: "100px", height: "100px" },
      link: "products/search/iphone-17" ,
    },
    {
      titleLines: ["Power.", "Performance.", "Portability."],
      desc: "Explore Our Wide Selection of Laptops",
      image:
        "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766601040/Jina/anwf63tbbv8ampctuyfr.png",
      bgColor: "#131315",
      cta: "Explore Collection",
      link: "products/Laptops",
    },



  ];

  return (
    <div className="mainCarousel">
      <button className="custom-prev">‹</button>
      <button className="custom-next">›</button>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 400000, disableOnInteraction: false }}
        loop
      >
        {promos.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="mainCarousel-slide"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="mainCarousel-content">
                <div className="mainCarousel-slogan">
                  {item.brand && (
                    <img src={item.brand} style={item.logoStyle} />
                  )}
                  {item.titleLines.map((line, i) => (
                    <h2 key={i} style={{ display: "block" }}>
                      {line}
                    </h2>
                  ))}
                  <p>{item.desc}</p>
                  <span>{item.note || ""}</span>
                  <button className="cta-button">
                    <NavLink to={item.link} style={{ all: "unset" }}>
                      {item.cta}{" "}
                    </NavLink>
                  </button>
                </div>
                <div className="mainCarousel-img">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainCarousel;
