import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./styles.css";

function App() {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("classicshop_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("classicshop_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Cart sync error:", e);
    }
  }, [cart]);

  // Add item to cart with quantity management
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Adjust item quantity (+1 or -1)
  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove an item by product ID
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Remove an item by index
  const removeFromCartByIndex = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear cart after checkout
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("classicshop_cart");
    } catch (e) {
      console.error(e);
    }
  };

  // Total quantity count across all cart items
  const totalCartCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Home addToCart={addToCart} />
          <Footer />
        </>
      ) : (
        <Navigate to="/register" replace />
      ),
    },
    {
      path: "/products",
      element: token ? (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Products addToCart={addToCart} />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/products/:id",
      element: token ? (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <ProductDetails addToCart={addToCart} />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/cart",
      element: token ? (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Cart
            cart={cart}
            onRemoveIndex={removeFromCartByIndex}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/checkout",
      element: token ? (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Checkout cart={cart} clearCart={clearCart} />
          <Footer />
        </>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    // Authentication routes
    {
      path: "/register",
      element: token ? (
        <Navigate to="/" replace />
      ) : (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Register />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: token ? (
        <Navigate to="/" replace />
      ) : (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <Login setToken={setToken} />
          <Footer />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Navbar cartCount={totalCartCount} token={token} setToken={setToken} />
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h2>404 - Page Not Found</h2>
            <Link to="/" style={{ color: "#1976d2", marginTop: "15px", display: "inline-block" }}>
              Back to Home
            </Link>
          </div>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
