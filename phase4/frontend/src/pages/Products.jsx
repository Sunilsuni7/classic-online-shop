import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import fallbackProducts from "../data/products";
import { API_BASE_URL } from "../config/api";

// Helper to determine product category
const getCategory = (product) => {
  const name = (product.name || "").toLowerCase();
  const desc = (product.description || "").toLowerCase();
  if (name.includes("headphone") || name.includes("speaker") || desc.includes("noise cancellation") || desc.includes("bass")) {
    return "Audio";
  }
  if (name.includes("watch") || desc.includes("heart rate") || desc.includes("fitness")) {
    return "Wearables";
  }
  if (name.includes("mouse") || name.includes("keyboard") || desc.includes("gaming")) {
    return "Gaming";
  }
  if (name.includes("tv") || name.includes("fan") || desc.includes("ceiling") || desc.includes("ultra hd")) {
    return "Home";
  }
  if (name.includes("phone") || name.includes("tablet") || name.includes("camera") || name.includes("drone")) {
    return "Electronics";
  }
  return "Accessories";
};

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Fetch products from backend API with automatic fallback
  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_BASE_URL}/products`, { timeout: 3000 })
      .then((res) => {
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.warn("Backend not reachable, using local product catalog:", err.message);
        if (isMounted) {
          setProducts(fallbackProducts);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["All", "Audio", "Wearables", "Gaming", "Electronics", "Home", "Accessories"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || getCategory(product) === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "30px 20px" }}>
      {/* Header and Controls */}
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "#1976d2" }}>Explore Our Products</h2>

        {/* Search & Sort Row */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          {/* Search Box */}
          <div style={{ flex: "1 1 280px" }}>
            <input
              type="text"
              placeholder="🔍 Search products by name or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontWeight: 600, fontSize: "14px" }}>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "14px", marginRight: "6px" }}>Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: selectedCategory === cat ? "1px solid #1976d2" : "1px solid #e0e0e0",
                backgroundColor: selectedCategory === cat ? "#1976d2" : "#f5f5f5",
                color: selectedCategory === cat ? "#fff" : "#333",
                fontSize: "13px",
                fontWeight: selectedCategory === cat ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product count notice */}
      <p style={{ marginBottom: "15px", color: "#666", fontSize: "14px" }}>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            background: "white",
            borderRadius: "12px",
          }}
        >
          <h3>No products match your criteria.</h3>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
