import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {

const [token, setToken] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);


// Check Token
useEffect(() => {

const checkToken = () => {
  const storedToken = localStorage.getItem("token");
  setToken(storedToken);
};

checkToken();

window.addEventListener("storage", checkToken);
window.addEventListener("focus", checkToken);

return () => {
  window.removeEventListener("storage", checkToken);
  window.removeEventListener("focus", checkToken);
};

}, []);


// Lock Scroll when menu open
useEffect(() => {

if(menuOpen){
document.body.classList.add("menu-open");
}else{
document.body.classList.remove("menu-open");
}

return () => {
document.body.classList.remove("menu-open");
};

},[menuOpen]);


// Logout
const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("user");

setToken(null);
setMenuOpen(false);

};


// Get User Safe
let user = null;

try{
user = JSON.parse(localStorage.getItem("user"));
}catch{
user = null;
}


return (

<nav className="navbar">

<div className="nav-container">

{/* Logo */}
<div className="logo">
<Link to="/">E-Shop</Link>
</div>


{/* Nav Links */}
<div className={`nav-links ${menuOpen ? "active" : ""}`}>

<Link to="/" onClick={()=>setMenuOpen(false)}>
Home
</Link>

<Link to="/products" onClick={()=>setMenuOpen(false)}>
Products
</Link>

<Link to="/cart" onClick={()=>setMenuOpen(false)}>
Cart
</Link>


{token && (
<Link to="/add_product" onClick={()=>setMenuOpen(false)}>
Add Product
</Link>
)}


{!token && (
<Link to="/login" onClick={()=>setMenuOpen(false)}>
Login
</Link>
)}

{!token && (
<Link to="/signup" onClick={()=>setMenuOpen(false)}>
Signup
</Link>
)}


{token && user && (
<Link 
to="/profile"
onClick={()=>setMenuOpen(false)}
>
<span className="name-user">Hello </span>
{user?.name?.split(" ")[0]}
</Link>
)}


{token && (
<Link 
to="/order-success"
onClick={()=>setMenuOpen(false)}
>
My Orders
</Link>
)}


{token && (
<button 
className="logout"
onClick={logout}
>
Logout
</button>
)}

</div>


{/* Menu Toggle (Right Side Always) */}
<div 
className="menu-toggle"
onClick={() => setMenuOpen(!menuOpen)}
>
☰
</div>

</div>


{/* Overlay */}
{menuOpen && (
<div 
className="overlay"
onClick={() => setMenuOpen(false)}
></div>
)}

</nav>

);

};

export default Navbar;