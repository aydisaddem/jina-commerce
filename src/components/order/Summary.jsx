const Summary = ({panel, total, count}) =>{
    return (
        <div className="orderContainer">
        <div className="order-summary-container">
     

          <div className="summary-products-section">
            <h4>Ordered products</h4>
            <div className="summary-products-list">
              {panel.map((item) => (
                <div key={item._id} className="summary-product-item">
                  <img
                    src={item.pictures[0]}
                    alt={item.name}
                    className="summary-product-image"
                  />
                  <div className="summary-product-details">
                    <p className="summary-product-name">{item.name}</p>
                    <div className="qty-price">
                      {" "}
                      <p className="summary-product-quantity">
                        Quantity : {item.purchaseQty}{" "}
                      </p>
                      <span className="summary-product-price">
                        {item.price},000 DT
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{total},000 DT</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Tax Stamp</span>
              <span className="summary-value">1,000 DT</span>
            </div>
            <div className="summary-row total-row">
              <span className="summary-label">Total</span>
              <span className="summary-value total-value">{total + 1},000 DT</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Summary;