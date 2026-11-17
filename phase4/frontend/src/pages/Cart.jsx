import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart({ cart = [], onRemoveIndex, updateQuantity, removeFromCart, clearCart }) {
  const navigate = useNavigate();
  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const totalItemsCount = safeCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleQtyChange = (item, index, delta) => {
    if (typeof updateQuantity === "function") {
      updateQuantity(item.id, delta);
    } else if (delta < 0 && (item.quantity || 1) <= 1 && typeof onRemoveIndex === "function") {
      onRemoveIndex(index);
    }
  };

  const handleRemove = (item, index) => {
    if (typeof removeFromCart === "function") {
      removeFromCart(item.id);
    } else if (typeof onRemoveIndex === "function") {
      onRemoveIndex(index);
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Shopping Cart</h2>

      {safeCart.length === 0 ? (
        <div className="empty-cart">
          <div style={{ fontSize: "56px", marginBottom: "15px" }}>🛍️</div>
          <p style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}>
            Your cart is empty. Start shopping!
          </p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button className="shop-btn" style={{ fontSize: "16px", padding: "12px 24px" }}>
              Explore Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {safeCart.map((item, index) => {
              const qty = item.quantity || 1;
              const itemTotal = (Number(item.price) || 0) * qty;

              return (
                <div key={item.id || index} className="cart-card">
                  <img
                    src={
                      item.image?.startsWith("/")
                        ? item.image
                        : `/images/${item.image}`
                    }
                    alt={item.name}
                    className="cart-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/image1.jpg";
                    }}
                  />

                  <div className="cart-info" style={{ flex: 1 }}>
                    <h3>{item.name}</h3>
                    <p style={{ color: "#666", marginBottom: "6px" }}>
                      Unit Price: <strong>₹{Number(item.price).toLocaleString("en-IN")}</strong>
                    </p>

                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "10px 0",
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "bold" }}>Quantity:</span>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid #ccc",
                          borderRadius: "6px",
                          background: "#fdfdfd",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, index, -1)}
                          style={{
                            padding: "4px 10px",
                            background: "transparent",
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            padding: "4px 12px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            minWidth: "32px",
                            textAlign: "center",
                          }}
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item, index, 1)}
                          style={{
                            padding: "4px 10px",
                            background: "transparent",
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ marginLeft: "15px", fontSize: "15px", color: "#1976d2", fontWeight: "bold" }}>
                        Subtotal: ₹{itemTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(item, index)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "16px", color: "#555" }}>Total Items:</span>
              <strong style={{ fontSize: "16px" }}>{totalItemsCount}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "16px", color: "#555" }}>Shipping:</span>
              <strong style={{ fontSize: "16px", color: "#2e7d32" }}>FREE</strong>
            </div>
            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #eee" }} />
            <h3 style={{ margin: "10px 0 20px 0" }}>
              Total: <span className="total-price" style={{ color: "#1976d2" }}>₹{totalAmount.toLocaleString("en-IN")}</span>
            </h3>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
              {typeof clearCart === "function" && (
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    padding: "12px 20px",
                    background: "#f5f5f5",
                    color: "#555",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Clear Cart
                </button>
              )}
              <button
                type="button"
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
