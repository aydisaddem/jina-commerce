import { useState } from "react";

const ItemCarousel = ({ pictures, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        src={pictures[currentIndex]}
        alt={`${name} ${currentIndex + 1}`}
        className="carousel-image"
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
