import "../../styles/productPreview.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../Loading";

const ProductPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("failed to fetch Data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="loading">
        <p>Product not found.</p>
      </div>
    );

  return (
    <div id="product-container">
        <div className="product-name">
            <h2>{data.name}</h2>
        </div>
        <hr/>
      <div className="product-info">
        <div className="carousel">
          <div className="main-image">
            <img
              src={data.pictures[activeIndex]}
              alt={`Product view ${activeIndex + 1}`}
            />

            <button
              className="bg-arrow leftSide"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? data.pictures.length - 1 : prev - 1
                )
              }
            >
              &#10094;
            </button>

            <button
              className="bg-arrow rightSide"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === data.pictures.length - 1 ? 0 : prev + 1
                )
              }
            >
              &#10095;
            </button>
          </div>

          <div className="thumbnails">
            {data.pictures.map((img, index) => (
              <button
                key={index}
                className={`thumb ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="product-desc">
            <p>Reference : {data.reference}</p>
            <p>{data.description}</p>
        </div>
      </div>
      <div className="prodcut-specification"></div>
    </div>
  );
};

export default ProductPreview;
