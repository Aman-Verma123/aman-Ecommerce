
import React from "react";
import { Link } from "react-router-dom";
import "../css/welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">

      <div className="welcome-header">
        <h1>Welcome To My E-Commerce</h1>
        <p>Explore Products, Manage Users and Start Shopping</p>
      </div>

      <div className="welcome-grid">

        <Link to="/products" className="welcome-card">
          <div className="card-icon">🛍️</div>
          <h3>Products</h3>
          <p>Browse all available products and shop easily</p>
        </Link>

        <Link to="/cart" className="welcome-card">
          <div className="card-icon">🛒</div>
          <h3>Cart</h3>
          <p>View and manage your shopping cart</p>
        </Link>

        <Link to="/login" className="welcome-card">
          <div className="card-icon">🔐</div>
          <h3>Login</h3>
          <p>Login to access your account</p>
        </Link>

        <Link to="/signup" className="welcome-card">
          <div className="card-icon">👤</div>
          <h3>Signup</h3>
          <p>Create account and start shopping</p>
        </Link>

        <Link to="/profile" className="welcome-card">
          <div className="card-icon">📦</div>
          <h3>User Profile</h3>
          <p>Manage your account and orders</p>
        </Link>

        <Link to="/order-success" className="welcome-card">
          <div className="card-icon">📋</div>
          <h3>Orders</h3>
          <p>Track your previous orders</p>
        </Link>

      </div>

    </div>
  );
};

export default Welcome;

