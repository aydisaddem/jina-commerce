import { useState, useEffect } from "react";
import "../../styles/scrollToTopButton.css"

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
    const container = document.querySelector("main"); 
    const toggleVisibility = () => {
        console.log(container.scrollTop)

      if (container.scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener("scroll", toggleVisibility);
    return () => container.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
  const container = document.querySelector("main");
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
    )
  );
}

export default ScrollToTopButton;
