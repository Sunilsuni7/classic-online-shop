import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const completeLogin = (token, msg) => {
    localStorage.setItem("token", token);
    setToken(token);
    setMessage(msg || "Login successful!");
    setTimeout(() => navigate("/"), 800);
  };

  const handleDemoLogin = () => {
    const demoToken = "demo-session-token-" + Date.now();
    completeLogin(demoToken, "Welcome! Logged in with Demo Account.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", form, { timeout: 3000 });
      completeLogin(res.data.token, res.data.message || "Login successful!");
    } catch (err) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        // Backend not reachable; check localStorage fallback users
        const localUsers = JSON.parse(localStorage.getItem("classicshop_users") || "[]");
        const found = localUsers.find(
          (u) => u.email === form.email && u.password === form.password
        );

        if (found) {
          completeLogin("local-token-" + Date.now(), "Login successful (Offline mode)!");
        } else if (localUsers.some((u) => u.email === form.email)) {
          setMessage("Incorrect password. Please try again.");
        } else {
          // If no local match, but backend is offline, inform user and offer Demo login
          setMessage(
            "Backend server is offline. Click 'Quick Demo Login' below to browse, or register locally first."
          );
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
        <h2 style={{ marginBottom: "20px", color: "#1976d2" }}>Sign In</h2>
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
            <label style={{ fontSize: "14px", fontWeight: 600 }}>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleDemoLogin}
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
          ⚡ Quick Demo Login (Instant Access)
        </button>

        {message && (
          <p
            style={{
              marginTop: "16px",
              color: message.includes("successful") || message.includes("Welcome") ? "green" : "#d32f2f",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee", fontSize: "14px" }}>
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: "#1976d2", fontWeight: 600, textDecoration: "none" }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
