import { useState, useContext, useEffect } from "react";
import api from "../../utils/api";
import Loading from "../Loading";

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/userOrders/${user._id}`);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "status-pending";
    case "processing":
      return "status-processing";
    case "shipped":
      return "status-shipped";
    case "delivered":
      return "status-delivered";
    case "cancelled":
      return "status-cancelled";
    default:
      return "status-pending";
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTotal = (order) => {
    const deliveryFee = order.deliveryFee === "free" ? 0 : parseFloat(order.deliveryFee) || 0;
    const taxStamp = parseFloat(order.taxStamp?.replace("DT", "")) || 0;
    return order.subTotal + deliveryFee + taxStamp;
  };

  if (loading) {
    return (
      <div className="account-component">
        <Loading/>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="account-component">
        <div className="no-orders">
          <i className="fa-solid fa-box-open"></i>
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-component">

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* Order Header */}
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.orderNumber}</h3>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              <div className={`order-status ${getStatusClass(order.status)}`}>
                {order.status}
              </div>
            </div>

            {/* Order Products */}
            <div className="order-products">
              {order.products.map((product) => (
                <div key={product._id} className="order-product">
                  <div className="order-product-info">
                    <p className="order-product-name">{product.name}</p>
                    <p className="order-product-reference">{product.brand} - {product.reference}</p>
                  </div>
                  <div className="order-product-quantity">Qty: {product.purchaseQty}</div>
                  <div className="order-product-price">{product.price.toLocaleString()},000 DT</div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{order.subTotal.toLocaleString()},000 DT</span>
              </div>
              <div className="summary-row">
                <span>Tax Stamp:</span>
                <span>{order.taxStamp}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>{order.deliveryFee === "free" ? "Free" : `${order.deliveryFee}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{calculateTotal(order).toLocaleString()},000 DT</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="order-details">
              <div className="detail-section">
                <h4><i className="fa-solid fa-truck"></i> Delivery Method</h4>
                <p>{order.deliveryMethod}</p>
                {order.deliveryNote && <p className="note">{order.deliveryNote}</p>}
              </div>
              
              <div className="detail-section">
                <h4><i className="fa-solid fa-location-dot"></i> Delivery Address</h4>
                <p className="address-name">{order.deliveryAddress.firstName} {order.deliveryAddress.lastName}</p>
                {order.deliveryAddress.company && <p>{order.deliveryAddress.company}</p>}
                <p>{order.deliveryAddress.address}</p>
                {order.deliveryAddress.addressComplement && <p>{order.deliveryAddress.addressComplement}</p>}
                <p>{order.deliveryAddress.postalCode && `${order.deliveryAddress.postalCode} `}{order.deliveryAddress.city}</p>
                <p>{order.deliveryAddress.phone}</p>
              </div>

              <div className="detail-section">
                <h4><i className="fa-solid fa-file-invoice"></i> Billing Address</h4>
                <p className="address-name">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                {order.billingAddress.company && <p>{order.billingAddress.company}</p>}
                {order.billingAddress.vatNumber && <p>VAT: {order.billingAddress.vatNumber}</p>}
                <p>{order.billingAddress.address}</p>
                {order.billingAddress.addressComplement && <p>{order.billingAddress.addressComplement}</p>}
                <p>{order.billingAddress.postalCode && `${order.billingAddress.postalCode} `}{order.billingAddress.city}</p>
                <p>{order.billingAddress.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;