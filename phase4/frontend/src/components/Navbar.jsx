import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/classicshop-logo.jpg";

const Navbar = ({ cartCount = 0, token, setToken }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (typeof setToken === "function") {
      setToken("");
    }
    navigate("/login");
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          backgroundColor: "#1976d2",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <img
            src={logo}
            alt="Classic Shop Logo"
            height="44"
            style={{ borderRadius: "8px", objectFit: "contain", background: "#fff", padding: "2px" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "0.5px" }}>
            Classic Shop
          </span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            padding: "4px 8px",
          }}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Desktop & Open Mobile Navigation */}
        <ul
          className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
            gap: "20px",
          }}
        >
          <li>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              style={styles.navLink}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...styles.navLink,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Cart</span>
              <span
                style={{
                  backgroundColor: "#ff9800",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {cartCount}
              </span>
            </Link>
          </li>

          {!token ? (
            <>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.navLink}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    ...styles.navLink,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "6px 14px",
                    borderRadius: "6px",
                  }}
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                style={{
                  backgroundColor: "#d32f2f",
                  border: "none",
                  padding: "8px 14px",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    transition: "opacity 0.2s ease",
  },
};

export default Navbar;
