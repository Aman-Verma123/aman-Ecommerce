import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {

const [token, setToken] = useState(localStorage.getItem("token"));
const [menuOpen,setMenuOpen] = useState(false);

useEffect(() => {
  const handleStorage = () => {
    setToken(localStorage.getItem("token"));
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}, []);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setToken(null);
};

return (

<nav className="navbar">

<div className="nav-container">

<div className="logo">
<Link to="/">E-Shop</Link>
</div>

<div className={`nav-links ${menuOpen ? "active" : ""}`}>

<Link to="/">Home</Link>
<Link to="/products">Products</Link>
<Link to="/cart">Cart</Link>

<Link to="/add_product">Add Product</Link>


{!token && <Link to="/login">Login</Link>}
{!token && <Link to="/signup">Signup</Link>}

{token && <Link to="/profile"> <span className="name-user">Hello</span> {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).name.split(" ")[0]}</Link>}

<Link to="/order-success">My Orders</Link>


{token && (
<button className="logout" onClick={logout}>
Logout
</button>
)}

</div>

<div className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
☰
</div>

</div>

</nav>

);

};

export default Navbar;