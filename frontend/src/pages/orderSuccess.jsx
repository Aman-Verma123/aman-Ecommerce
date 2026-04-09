
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/orderSuccess.css";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {


const navigate = useNavigate();

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);





useEffect(()=>{
const placeOrder = async ()=>{

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user || !token){
alert("You should 'login' first to view Orders");
navigate("/login");
return;
}};

placeOrder();
},[navigate]);



useEffect(()=>{

const fetchOrders = async ()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

const res = await axios.get(
// `http://localhost:5001/orders/${user._id}`
`${import.meta.env.VITE_API_URL}/orders/${user._id}`
);

setOrders(res.data);
setLoading(false);

}
catch(err){
console.log(err);
setLoading(false);
}

};

fetchOrders();

},[]);


if(loading){
return (
<div className="success-page">
<h2>Loading Orders...</h2>
</div>
);
}

// ...............................................
const deleteOrder = async (id) => {

const confirmDelete = window.confirm(
"Are you sure you want to delete this order?"
);

if(!confirmDelete) return;

try{

await axios.delete(
// `http://localhost:5001/orders/${id}`
`${import.meta.env.VITE_API_URL}/orders/${id}`

);

setOrders(
orders.filter(order => order._id !== id)
);

}
catch(err){
console.log(err);
}

};
// ..................................................


return (

<div className="success-page">

<div className="success-container">

<h1>🎉 Order Placed Successfully</h1>
<p>Your Order has been confirmed</p>


<div className="orders-box">

{
orders.map(order => (

<div className="order-card" key={order._id}>

<h3>Order ID: {order._id}</h3>

<div className="order-items">

{
order.items.map(item => (

<div className="item" key={item.productId}>

<img src={item.imageUrl} alt="" />

<div className="item-info">

<h4>{item.name}</h4>

<p>Qty: {item.quantity}</p>

</div>

<div className="item-price">
₹ {item.price * item.quantity}
</div>

</div>

))
}

</div>

<div className="order-footer">

<div>
Status: <span className="status">{order.status}</span>
</div>

<div className="total">
Total: ₹ {order.total}
</div>



<button 
className="delete-btn"
onClick={() => deleteOrder(order._id)}
>
Cancel Order
</button>



</div>

</div>

))
}


</div>


<Link to="/products">
<button className="continue-btn">
Continue Shopping
</button>
</Link>


</div>

</div>

);

};

export default OrderSuccess;
