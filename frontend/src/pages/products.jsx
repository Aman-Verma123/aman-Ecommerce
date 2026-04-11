import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/products.css";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {

const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {

axios
.get(`${import.meta.env.VITE_API_URL}/products`)
.then(res => {
setProducts(res.data);
setLoading(false);
})
.catch(err => {
console.error(err);
setError("Failed to load products");
setLoading(false);
});

}, []);




const handleAddToCart = (product) => {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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



/* ================= LOADING ================= */

if(loading){

return(
<div className="products-loading-wrapper">
<div className="products-loader"></div>
<h2 className="loading-text">Loading Products...</h2>
</div>
)

}



/* ================= ERROR ================= */

if(error){

return(
<div className="products-error">
<h2>{error}</h2>
</div>
)

}




return (

<div className="products-page">

{/* Header */}

<div className="products-header">
<h1 className="products-title">Our Products</h1>
<p className="products-subtitle">Discover Amazing Deals</p>
</div>


{/* Products */}

<div className="products-container">

{
products.map((item) => (

<div 
className="product-card" 
key={item._id}
onClick={() => navigate(`/product/${item._id}`)}
>

<div className="product-image-container">

<img 
src={item.imageUrl} 
alt={item.name}
className="product-image"
/>

<span className="product-category">
{item.category}
</span>

</div>


<div className="product-info">

<h3 className="product-name">
{item.name}
</h3>

<p className="product-description">
{item.description.substring(0,18)}...
</p>

<div className="product-rating">
⭐ {item.rating || 4.5}
</div>


<div className="product-price-stock">

<div className="product-price">
₹ {item.price}
</div>

<div 
className={`product-stock 
${item.stock > 0 ? "in-stock" : "out-stock"}`}
>
{item.stock > 0 ? "In Stock" : "Out of Stock"}
</div>

</div>



<div className="product-buttons">

<button 
className="cart-btn"
onClick={(e)=>{
e.stopPropagation();
handleAddToCart(item);
}}
>
Add to Cart
</button>


<Link 
to={`/product/${item._id}`}
onClick={(e)=>e.stopPropagation()}
>

<button className="view-btn">
View
</button>

</Link>


</div>


<Link 
to={`/orders/${item._id}`} 
className="order-btn"
onClick={(e)=>e.stopPropagation()}
>
Order Now
</Link>

</div>

</div>

))
}

</div>

</div>

);

};

export default Products;