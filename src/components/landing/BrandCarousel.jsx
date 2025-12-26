import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { brands } from "../../data/brands";

import "swiper/css";

const BrandCarousel = () => {
  const brandsItems = Object.keys(brands).map((name) => ({
    name,
    logo: brands[name],
    link: `products/brands/${name}`,
  }));

  return (
    <div className="brands-container">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        slidesPerView={6}   
        spaceBetween={30}  
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 30 },
        }}
      >
        {brandsItems.map((item) => (
          <SwiperSlide key={item.name}>
            <NavLink to={item.link} className="brand-link">
              <img src={item.logo} alt={item.name} className="brand-logo" />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandCarousel;
