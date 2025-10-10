import React from "react";

function Cart({ cart = [], onRemoveIndex }) {
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
                {/* ✅ Fixed image path */}
                <img src={`/images/${item.image}`} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button onClick={() => onRemoveIndex(index)}>❌ Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>
              Total: <span className="total-price">₹{total}</span>
            </h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
