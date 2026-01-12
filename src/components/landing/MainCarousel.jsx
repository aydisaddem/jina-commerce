import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { brands } from "../../data/brands";
import "swiper/css";
import "swiper/css/pagination";
import { cloudinaryOptimize } from "../../utils/cloudinaryOptimize";


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
  useEffect(() => {
  if (promos.length === 0) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = cloudinaryHero(promos[0].image, 1200);
  document.head.appendChild(link);
  return () => document.head.removeChild(link);
}, [promos]);


  const cloudinaryHero = (url, width) =>
  url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
 

  return (
    <div className="mainCarousel">
      <button className="custom-prev">‹</button>
      <button className="custom-next">›</button>

 <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  watchSlidesProgress
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
                    <img
  src={cloudinaryOptimize(item.brand, 200)}
  style={item.logoStyle}
  loading="lazy"
  decoding="async"
  alt={item.titleLines[0]}
/>

                  )}
                  {item.titleLines.map((line, i) => (
                    <h2 key={i} style={{ display: "block" }}>
                      {line}
                    </h2>
                  ))}
                  <p>{item.desc}</p>
                  <span>{item.note || ""}</span>
                  <button className="cta-button">
                    <Link to={item.link} style={{ all: "unset" }}>
                      {item.cta}{" "}
                    </Link>
                  </button>
                </div>
                <div className="mainCarousel-img">
  <img
    src={cloudinaryHero(item.image, 1200)}
    srcSet={`
      ${cloudinaryHero(item.image, 600)} 600w,
      ${cloudinaryHero(item.image, 900)} 900w,
      ${cloudinaryHero(item.image, 1200)} 1200w
    `}
    sizes="(max-width: 768px) 100vw, 1200px"
    alt={item.titleLines[0]}
    width="1200"
    height="1200"
    loading={index === 0 ? "eager" : "lazy"}
    fetchPriority={index === 0 ? "high" : "auto"}
    decoding="async"
  />
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
