import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../Loading.jsx";
import api from "../../utils/api.js";
import Swal from "sweetalert2";
import { slugify } from "../../utils/slugify.js";
import NotFound from "../NotFound.jsx";
import searchImg from "../../assets/search.png"

const Wishlist = () => {
  useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);

  if (!user) {
    return <Loading />;
  }
  const wishlist = user?.wishlist || [];

  const removeItem = async (item) => {
    const userId = user._id;
    try {
      const response = await api.put(`/users/${userId}/removeFromWishlist`, {
        itemId: item.id,
      });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently removed from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef0200",
      cancelButtonColor: "#121117",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(item);
        Swal.fire({
          title: "Deleted!",
          text: "The product has been removed from your panel.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="account-component">
      {wishlist.length > 0 ? (
        wishlist.map((item, idx) => (
          <div className="wishlist-item" key={idx}>
            <div className="wishlistimg-wrapper">
              <img
                src={item.picture}
                alt={item.name}
                className="item-picture"
              />
            </div>
            <div className="wishlist-info-block">
              <h6>{item.name}</h6>
              <p className="wishlistItem-reference">[{item.reference}]</p>
              <p className="wishlistItem-price">{item.price},000 DT</p>

              <button className="see-more">
                <NavLink to={`/products/${slugify(item.category)}${
  item.subCategory && item.subCategory !== item.category ? `/${slugify(item.subCategory)}` : ""
}/preview/${item.id}`}
              style={{ all: "unset" }}>
                  See more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="15px"
                    width="15px"
                    className="icon"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1.5"
                      stroke="#292D32"
                      d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                    />
                  </svg>
                </NavLink>
              </button>
            </div>
            <div className="wishlist-BtnDiv">
              <button
                className="deleteBtn"
                type="button"
                onClick={() => handleDelete(item)}
              >
                <span className="button__text">Delete</span>
                <span className="button__icon">
                  <svg
                    className="svg"
                    height="512"
                    viewBox="0 0 512 512"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path
                      d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 32,
                      }}
                    />
                    <line
                      x1="80"
                      x2="432"
                      y1="112"
                      y2="112"
                      style={{
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeMiterlimit: 10,
                        strokeWidth: 32,
                      }}
                    />
                    <path
                      d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 32,
                      }}
                    />
                    <line
                      x1="256"
                      x2="256"
                      y1="176"
                      y2="400"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 32,
                      }}
                    />
                    <line
                      x1="184"
                      x2="192"
                      y1="176"
                      y2="400"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 32,
                      }}
                    />
                    <line
                      x1="328"
                      x2="320"
                      y1="176"
                      y2="400"
                      style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 32,
                      }}
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <NotFound img={searchImg} message={"Empty wishlist"}/>
      )}
    </div>
  );
};

export default Wishlist;
