import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (addToCart) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="card">
      <img
        src={product.image?.startsWith("/") ? product.image : `/images/${product.image}`}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/image1.jpg";
        }}
      />

      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1976d2" }}>
        ₹{Number(product.price).toLocaleString("en-IN")}
      </p>

      <div
        className="card-actions"
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          justifyContent: "center",
          marginTop: "auto",
          flexWrap: "wrap",
        }}
      >
        <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
          <button type="button" style={{ padding: "10px 16px", fontSize: "14px" }}>
            View Details
          </button>
        </Link>

        {addToCart && (
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              padding: "10px 16px",
              fontSize: "14px",
              backgroundColor: added ? "#2e7d32" : "#ff9800",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
          >
            {added ? "Added! ✓" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
