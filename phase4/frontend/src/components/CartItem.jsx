import React from "react";

function CartItem({ item, removeFromCart, updateQuantity }) {
  const qty = item.quantity || 1;
  const price = Number(item.price) || 0;

  return (
    <div className="cart-item" style={{ display: "flex", gap: "15px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
      <img
        src={item.image?.startsWith("/") ? item.image : `/images/${item.image}`}
        alt={item.name}
        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/image1.jpg";
        }}
      />
      <div className="cart-info" style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
        <p style={{ margin: "0 0 8px 0", color: "#666" }}>Price: ₹{price.toLocaleString("en-IN")}</p>

        {updateQuantity && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, -1)}
              style={{ padding: "2px 8px", cursor: "pointer" }}
            >
              -
            </button>
            <span>{qty}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, 1)}
              style={{ padding: "2px 8px", cursor: "pointer" }}
            >
              +
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => removeFromCart && removeFromCart(item.id || item)}
          style={{ background: "#f44336", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
