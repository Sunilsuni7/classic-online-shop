import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const Checkout = ({ cart = [], clearCart }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const safeCart = Array.isArray(cart) ? cart : [];
  const totalAmount = safeCart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const totalItemsCount = safeCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      newErrors.email = "Valid email address required";
    if (!/^\d{10}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (form.address.trim().length < 5)
      newErrors.address = "Address must be at least 5 characters long";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (safeCart.length === 0) {
      alert("Your cart is empty! Please add products before placing an order.");
      navigate("/products");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const orderData = {
      items: safeCart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      customer: form,
      totalAmount,
      createdAt: new Date().toLocaleString(),
    };

    let orderId = Date.now();
    let orderSuccess = false;

    // Try posting to backend API first
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        orderId = data.order?.id || orderId;
        orderSuccess = true;
      }
    } catch {
      // Backend unavailable; fallback to offline/localStorage storage
      console.warn("Backend unavailable, saving order to local storage");
    }

    // Save to localStorage as well so history is preserved
    try {
      const existingOrders = JSON.parse(
        localStorage.getItem("classicshop_orders") || "[]"
      );
      existingOrders.push({ id: orderId, ...orderData });
      localStorage.setItem("classicshop_orders", JSON.stringify(existingOrders));
      orderSuccess = true;
    } catch (e) {
      console.error("LocalStorage save failed:", e);
    }

    setLoading(false);

    if (orderSuccess) {
      setPlacedOrder({ id: orderId, ...orderData });
      setSuccessMsg(`Order #${orderId} placed successfully!`);
      if (typeof clearCart === "function") {
        clearCart();
      }
      setForm({ name: "", email: "", phone: "", address: "" });
    } else {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>

      {placedOrder ? (
        <div style={styles.successCard}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
          <h3 style={{ color: "#2e7d32", marginBottom: "10px" }}>{successMsg}</h3>
          <p style={{ color: "#555", marginBottom: "15px" }}>
            Thank you for shopping with Classic Online Shop!
          </p>
          <div
            style={{
              background: "#f9f9f9",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            <p><strong>Order ID:</strong> #{placedOrder.id}</p>
            <p><strong>Customer:</strong> {placedOrder.customer.name} ({placedOrder.customer.phone})</p>
            <p><strong>Shipping Address:</strong> {placedOrder.customer.address}</p>
            <p><strong>Total Amount:</strong> ₹{Number(placedOrder.totalAmount).toLocaleString("en-IN")}</p>
            <p><strong>Items:</strong> {placedOrder.items.map((i) => `${i.name} (x${i.quantity})`).join(", ")}</p>
          </div>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button style={styles.button}>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div style={styles.contentGrid}>
          {/* Order Summary */}
          <div style={styles.summaryCard}>
            <h3 style={{ marginBottom: "15px", color: "#1976d2" }}>Order Summary</h3>
            {safeCart.length === 0 ? (
              <p style={{ color: "#888" }}>Your cart is empty.</p>
            ) : (
              <div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 15px 0" }}>
                  {safeCart.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid #eee",
                        fontSize: "14px",
                      }}
                    >
                      <span>
                        {item.name} <small style={{ color: "#777" }}>x{item.quantity || 1}</small>
                      </span>
                      <strong>
                        ₹{Number((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                      </strong>
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: "2px solid #ddd", paddingTop: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span>Total Items:</span>
                    <span>{totalItemsCount}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span>Delivery:</span>
                    <span style={{ color: "#2e7d32", fontWeight: "bold" }}>FREE</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    <span>Total:</span>
                    <span style={{ color: "#1976d2" }}>
                      ₹{Number(totalAmount).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div style={styles.formCard}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Shipping Information</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.name && <p style={styles.error}>{errors.name}</p>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email Address:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.email && <p style={styles.error}>{errors.email}</p>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Phone Number (10 digits):</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.phone && <p style={styles.error}>{errors.phone}</p>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Shipping Address:</label>
                <textarea
                  name="address"
                  rows={3}
                  placeholder="Street, City, State, PIN"
                  value={form.address}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                {errors.address && <p style={styles.error}>{errors.address}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || safeCart.length === 0}
                style={{
                  ...styles.button,
                  opacity: loading || safeCart.length === 0 ? 0.6 : 1,
                  cursor: loading || safeCart.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Placing Order..." : `Place Order (₹${Number(totalAmount).toLocaleString("en-IN")})`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#2d2d2d",
    fontSize: "28px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    alignItems: "start",
  },
  summaryCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  formCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  successCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "560px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    resize: "vertical",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  error: {
    color: "#d32f2f",
    fontSize: "0.85rem",
    marginTop: "4px",
  },
  button: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
};

export default Checkout;
