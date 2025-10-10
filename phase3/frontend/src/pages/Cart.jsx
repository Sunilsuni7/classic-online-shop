import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart = [], onRemoveIndex }) {
  const navigate = useNavigate();
  const safeCart = Array.isArray(cart) ? cart : [];
  const total = safeCart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Shopping Cart</h2>

      {safeCart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Start shopping!</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {safeCart.map((item, index) => (
              <div key={index} className="cart-card">
                {/* ✅ Corrected image path */}
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveIndex(index)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>
              Total: <span className="total-price">₹{total}</span>
            </h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
