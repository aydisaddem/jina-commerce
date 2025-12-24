import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/mainCarousel.css';
import {brands} from '../../data/brands'

const MainCarousel = () => {
  const promos = [
    {
      title: 'Power. Performance. Portability.',
      desc: 'Explore Our Wide Selection of Laptops',
      image:
        'https://res.cloudinary.com/dhxnksrd6/image/upload/v1766575397/Jina/xryorncggkqnqwsq8r72.png',
      bgColor: '#000',
      cta: "Explore Collection",
    },
    {
      title: 'iPhone 17 ',
      desc: 'Engineered for Apple Intelligence. ',
      note: '2-Year Warranty',
      image:
        'https://res.cloudinary.com/dhxnksrd6/image/upload/v1766584838/Jina/adsgwblfu0kfstjdg9m5.jpg',
      bgColor: '#000',
      cta: "Discover More",
      brand: "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766140113/Jina/kbpgvzbobkcjkalzbdvq.png",
    },
        {
      title: 'iPad air',
      desc: 'The power of lightness.',
      note: 'Available in several colors',
      image:
        'https://res.cloudinary.com/dhxnksrd6/image/upload/v1766586871/Jina/zr9hfwjjp2aej3coxns2.png',
      bgColor: '#000',
      cta: "Discover More",
      brand: "https://res.cloudinary.com/dhxnksrd6/image/upload/v1766140113/Jina/kbpgvzbobkcjkalzbdvq.png",
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
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  {item.brand && <img src={item.brand} />}
                  <h2>{item.title}</h2>
                  <p >
                    {item.desc}
                  </p>
                  <span>{item.note || ""}</span>
                  <button className='cta-button'>{item.cta}</button>
                </div>
             <div className="mainCarousel-img" >
 <img
                  src={item.image}
                  alt={item.title}
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
