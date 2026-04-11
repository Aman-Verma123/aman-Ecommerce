import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {

const [token, setToken] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);


// Check token on page load
useEffect(() => {
  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };

  checkToken();

  window.addEventListener("storage", checkToken);

  return () => {
    window.removeEventListener("storage", checkToken);
  };
}, []);


// Logout Function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setToken(null);
};


// Get user name safely
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

return (

<nav className="navbar">

<div className="nav-container">

{/* Logo */}
<div className="logo">
<Link to="/">E-Shop</Link>
</div>


{/* Links */}
<div className={`nav-links ${menuOpen ? "active" : ""}`}>

<Link to="/">Home</Link>
<Link to="/products">Products</Link>
<Link to="/cart">Cart</Link>

{token && <Link to="/add_product">Add Product</Link>}

{!token && <Link to="/login">Login</Link>}
{!token && <Link to="/signup">Signup</Link>}

{token && user && (
<Link to="/profile">
<span className="name-user">Hello </span>
{user.name.split(" ")[0]}
</Link>
)}

{token && (
<Link to="/order-success">My Orders</Link>
)}

{token && (
<button className="logout" onClick={logout}>
Logout
</button>
)}

</div>


{/* Mobile Menu Toggle */}
<div 
className="menu-toggle" 
onClick={() => setMenuOpen(!menuOpen)}
>
☰
</div>

</div>

</nav>

);

};

export default Navbar;