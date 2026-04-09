
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/productDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {

const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

const fetchProduct = async () => {
  try {
    const res = await axios.get(
      // `http://localhost:5001/product/${id}`
      `${import.meta.env.VITE_API_URL}/product/${id}`
    );

    setProduct(res.data);
    setLoading(false);

  } catch (error) {
    console.log("Error fetching product", error);
    setLoading(false);
  }
};

fetchProduct();

}, [id]);


if (loading) {
  return (
    <div className="product-loading">
      <div className="spinner"></div>
    </div>
  );
}

// ---------------------------------------------
const handleAddToCart = () => {

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// check product already exists
const existingProduct = cart.find(
(item) => item._id === product._id// item product he jo localDB me save he 
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


const handleDeleteProduct = (id) => {

if(window.confirm("Are you sure you want to delete this product?")){

  // axios.delete(`http://localhost:5001/product/${id}`) 
  axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
  .then(res => {
    alert( res.data.message);
    setProduct(null);
    navigate("/products");
  })
  .catch(err => console.error(err));

  }

};



return (

<div className="product-page">

<div className="product-wrapper">

{/* Image Section */}
<div className="product-left">

<div className="image-card">

<img
src={product?.imageUrl}
alt={product?.name}
className="product-main-image"
/>

<div className="category-badge">
{product?.category}
</div>

</div>

</div>


{/* Details Section */}
<div className="product-right">

<h1 className="product-name">
{product?.name}
</h1>

<div className="rating-row">

<div className="stars">
{"★".repeat(product?.rating)}
{"☆".repeat(5 - product?.rating)}
</div>

<span className="stock"> {product?.stock} In Stock </span>

</div>

<p className="product-description"> {product?.description} </p>


<div className="price-box">

<div className="price"> ₹{product?.price} </div>

<div className="tax-info"> Inclusive of all taxes </div>

</div>


<div className="action-buttons">

<button className="add-cart"  onClick={handleAddToCart}>  Add To Cart </button>

<button className="buy-now">  Buy Now  </button>

<button className=" delete-btn " onClick={() => handleDeleteProduct(product._id)}> Delete </button>

</div>


<div className="extra-details">

<div className="detail-item"> 🚚 Free Delivery Available </div>

<div className="detail-item">  🔁 Easy 7 Day Return </div>

<div className="detail-item"> 🔒 Secure Checkout </div>

</div>


</div>


</div>

</div>

);

};

export default ProductDetails;
