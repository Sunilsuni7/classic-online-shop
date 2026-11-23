import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, form, { timeout: 3000 });
      setMessage(res.data.message || "User registered successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        // Backend offline; register locally in localStorage
        const localUsers = JSON.parse(localStorage.getItem("classicshop_users") || "[]");
        if (localUsers.find((u) => u.email === form.email)) {
          setMessage("Email already registered locally.");
        } else {
          localUsers.push({ email: form.email, password: form.password, role: "user" });
          localStorage.setItem("classicshop_users", JSON.stringify(localUsers));
          setMessage("Registered successfully (Offline mode)! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1200);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "36px 30px",
          borderRadius: "14px",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "380px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1976d2" }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ fontSize: "14px", fontWeight: 600 }}>Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ fontSize: "14px", fontWeight: 600 }}>Password (min 6 characters):</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "10px 12px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            const guestToken = "guest-session-" + Date.now();
            localStorage.setItem("token", guestToken);
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "10px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          ⚡ Browse as Guest (Instant Access)
        </button>

        {message && (
          <p
            style={{
              marginTop: "16px",
              color: message.includes("success") ? "green" : "#d32f2f",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee", fontSize: "14px" }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
