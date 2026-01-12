import { useState } from "react";
import { cloudinaryOptimize } from "../../utils/cloudinaryOptimize";

const ItemCarousel = ({ pictures, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLCP = currentIndex === 0;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      {pictures.length > 1 && (
        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>
      )}

        <img
    src={cloudinaryOptimize(pictures[currentIndex], 400)}
    srcSet={`
      ${cloudinaryOptimize(pictures[currentIndex], 200)} 200w,
      ${cloudinaryOptimize(pictures[currentIndex], 400)} 400w,
      ${cloudinaryOptimize(pictures[currentIndex], 600)} 600w
    `}
    sizes="(max-width: 768px) 100vw, 400px"
    alt={`${name} ${currentIndex + 1}`}
    width="400"
    height="400"
    className="carousel-image"
    loading={isLCP ? "eager" : "lazy"}
    fetchPriority={isLCP ? "high" : "auto"}
    decoding="async"
  />


      {pictures.length > 1 && (
        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      )}
    </div>
  );
};

export default ItemCarousel;
