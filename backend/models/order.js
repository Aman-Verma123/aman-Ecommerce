import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

items:[
{
productId:String,
name:String,
price:Number,
quantity:Number,
imageUrl:String
}
],

total:{
type:Number,
required:true
},

name:String,
phone:String,
address:String,
city:String,
pincode:String,

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

const Order = mongoose.model("Order", orderSchema);

export default Order;