import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Product not found</h2>
        <Link to="/products" style={{ display: "inline-block", marginTop: "15px", color: "#1976d2" }}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (addToCart) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <img
          src={product.image?.startsWith("/") ? product.image : `/images/${product.image}`}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/image1.jpg";
          }}
        />

        <div className="product-info">
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: 600,
              fontSize: "14px",
              display: "inline-block",
              marginBottom: "15px",
            }}
          >
            ← Back to Products
          </Link>

          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3 style={{ color: "#1976d2", fontSize: "28px" }}>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </h3>

          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <label style={{ fontWeight: 600 }}>Quantity:</label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  padding: "6px 14px",
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                -
              </button>
              <span style={{ padding: "6px 14px", fontWeight: "bold" }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  padding: "6px 14px",
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            style={{
              backgroundColor: added ? "#2e7d32" : undefined,
              transition: "all 0.3s ease",
            }}
          >
            {added ? "Added to Cart! ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
