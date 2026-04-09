import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/cart.css";

const Cart = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  console.log("Token in Cart:", token);

  const [cartItems, setCartItems] = useState([]);

  // Load Cart From LocalStorage
  useEffect(() => {
    if (!token) {
      alert("Login Required to access Cart");
      navigate("/login");
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

  }, [token, navigate]);


  // Increase Quantity
  const increaseQty = (id) => {

    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  // Decrease Quantity
  const decreaseQty = (id) => {

    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  // Remove Item
  const removeItem = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-wrapper">

        <div className="cart-items">

          {cartItems.length === 0 ? (
            <h3 className="empty-cart">
              Your Cart is Empty please add some products to proceed <br /><br />
              <Link to="/products" className="btn-modern">
                Shop Now
              </Link>
            </h3>
            
          ) : (

            cartItems.map((item) => (

              <div className="cart-card" key={item._id}>

                <img
                  src={item.imageUrl}
                  alt={item.name}
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                    >
                      +
                    </button>
                  </div>

                </div>

                <div className="cart-actions">
                  <h4>
                    ₹{item.price * item.quantity}
                  </h4>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))

          )}

        </div>


        {cartItems.length > 0 && (

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button className="checkout-btn">
              Proceed To Checkout
            </button>

          </div>

        )}

      </div>
    </div>
  );
};

export default Cart;