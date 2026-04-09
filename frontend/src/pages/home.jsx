
import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

    

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Best Deals On Latest Products</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>
      </section>


      {/* Categories */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-container">
          <div className="category-card">Electronics</div>
          <div className="category-card">Fashion</div>
          <div className="category-card">Shoes</div>
          <div className="category-card">Mobiles</div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>

        <div className="product-container">

          <div className="product-card">
            <img src="https://via.placeholder.com/200" />
            <h3>Headphones</h3>
            <p>₹1999</p>
            <button>Add To Cart</button>
          </div>

          <div className="product-card">
            <img src="https://via.placeholder.com/200" />
            <h3>Shoes</h3>
            <p>₹2999</p>
            <button>Add To Cart</button>
          </div>

          <div className="product-card">
            <img src="https://via.placeholder.com/200" />
            <h3>Watch</h3>
            <p>₹1499</p>
            <button>Add To Cart</button>
          </div>

          <div className="product-card">
            <img src="https://via.placeholder.com/200" />
            <h3>Mobile</h3>
            <p>₹15999</p>
            <button>Add To Cart</button>
          </div>

        </div>
      </section>


      {/* Banner */}
      <section className="banner">
        <h2>Big Sale Coming Soon</h2>
        <p>Up to 50% Off</p>
      </section>


      {/* Footer */}
      <footer className="footer">
        <h3>ShopEase</h3>
        <p>Best Ecommerce Website</p>
      </footer>


    </div>
  );
};

export default Home;