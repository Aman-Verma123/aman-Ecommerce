import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/products.css";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
const navigate = useNavigate();

  

const [products, setProducts] = useState([]);

useEffect(() => {

// axios.get("http://localhost:5001/products")
axios.get(`${import.meta.env.VITE_API_URL}/products`)
.then(res => setProducts(res.data))
.catch(err => console.error(err));

}, []);



const handleAddToCart = (product) => {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// check product already exists
const existingProduct = cart.find(
(item) => item._id === product._id
);

if(existingProduct){
cart = cart.map(item =>
item._id === product._id
? { ...item, quantity: item.quantity + 1 }
: item
);
}else{

cart.push({
...product,
quantity: 1
});

}

localStorage.setItem("cart", JSON.stringify(cart));

alert("Product Added To Cart");

};




return (

<div className="products-page">

{/* Header */}

<div className="products-header">
<h1>Our Products</h1>
<p>Discover Amazing Deals</p>
</div>


{/* Products */}

<div className="products-container">

{
products.map((item) => (

<div className="product-card" key={item._id}   
 onClick={() => navigate(`/product/${item._id}`)}
>   
  {/* ye div pr click krne pr  <Link to={`/product/${item._id}`}> is pr redicect ho .. */}

<div className="image-container">

<img src={item.imageUrl} alt={item.name} />




 <span className="category"> {item.category} </span>


</div>


<div className="product-info">

<h3>{item.name}</h3>

<p className="description">
{/* {item.description.substring(0,60)}... */}
{item.description.substring(0,18)}...
</p>

<div className="rating gapping">
⭐ {item.rating || 4.5}
</div>

{/* ............................. ek line me align krne he ........................ */}
<div className="inOneLine">
  <div className="price ">
₹ {item.price}
</div>

<div className={`stock ${item.stock > 0 ? "in" : "out"}`}>
{item.stock > 0 ? "In Stock" : "Out of Stock"}
</div>
</div>

{/* ............................................................ */}
<div className="btn-container">

{/* <button className="cart-btn" onClick={() => handleAddToCart(item)}>
Add To Cart
</button> */}
<button 
className="cart-btn" 
onClick={(e) => {
e.stopPropagation();
handleAddToCart(item);
}}
>Add to Cart</button>



<Link to={`/product/${item._id}`}
onClick={(e) => e.stopPropagation()}>
<button className="view-btn" >
View
</button>
</Link>


</div>

{/* <Link to={`/orders`} className="order-btn"
onClick={(e) => e.stopPropagation()}>Order Now</Link> */}
<Link  to={`/orders/${item._id}`}  className="order-btn" onClick={(e) => e.stopPropagation()}> Order Now </Link>

</div>

</div>

))
}

</div>

</div>

);

};

export default Products; 