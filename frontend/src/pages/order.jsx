import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/order.css";

const Order = () => {



// ////////////////////////////////////////////////////
const { id } = useParams();
const navigate = useNavigate();





useEffect(()=>{

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user || !token){
alert("Session Expired, Please Login Again");
navigate("/login");
return;
}

},[navigate]);


// ///////////////////////////////////////////////////////

const [product,setProduct] = useState(null);
const [loading,setLoading] = useState(false);

const [formData,setFormData] = useState({
name:"",
phone:"",
address:"",
city:"",
pincode:""
});


useEffect(()=>{

// axios.get(`http://localhost:5001/product/${id}`)
axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)

.then(res => setProduct(res.data))
.catch(err => console.log(err));

},[]);


const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};


const placeOrder = async ()=>{

const user = JSON.parse(localStorage.getItem("user"));

const orderData = {

userId:user?._id,

items:[
{
productId:product._id,
name:product.name,
price:product.price,
quantity:1,
imageUrl:product.imageUrl
}
],

total:product.price,

...formData

};

try{

setLoading(true);

await axios.post(
// "http://localhost:5001/orders",
// orderData
`${import.meta.env.VITE_API_URL}/orders`,
orderData
);

alert("Order Placed Successfully");

navigate("/order-success");

}
catch(err){
console.log(err);
}
finally{
setLoading(false);
}

};


if(!product){
return <h2>Loading...</h2>
}


return (

<div className="order-page">

<div className="order-container">

{/* Left */}

<div className="order-form">

<h2>Shipping Details</h2>

<input name="name" placeholder="Full Name" onChange={handleChange}/>
<input name="phone" placeholder="Phone" onChange={handleChange}/>

<textarea
name="address"
placeholder="Address"
onChange={handleChange}
/>

<div className="two-col">

<input name="city" placeholder="City" onChange={handleChange}/>
<input name="pincode" placeholder="Pincode" onChange={handleChange}/>

</div>

<button
className="place-order"
onClick={placeOrder}
>

{loading ? "Placing..." : "Place Order"}

</button>

</div>


{/* Right */}

<div className="order-summary">

<h2>Order Summary</h2>

<div className="summary-item">

<img src={product.imageUrl} alt="" />

<div>
<h4>{product.name}</h4>
<p>Qty: 1</p>
</div>

<div className="price">
₹ {product.price}
</div>

</div>


<div className="total-box">

<h3>Total</h3>

<h2>₹ {product.price}</h2>

</div>


</div>

</div>

</div>

);

};

export default Order;