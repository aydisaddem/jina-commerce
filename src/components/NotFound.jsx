import "../styles/notFound.css";
import block from "../assets/search.png";
const NotFound = ({ img, message }) => {
  return (
    <div id="notFound">
      {img && <img src={img} alt="Notice" loading="lazy" />}
      <p>{message || "Not found"}</p>
    </div>
  );
};

export default NotFound;
