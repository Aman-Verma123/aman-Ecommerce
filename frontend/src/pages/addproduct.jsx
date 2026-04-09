
import React, { useState } from "react";
import axios from "axios";
import "../css/addproduct.css";

const AddProduct = () => {

const [product, setProduct] = useState({
name: "",
description: "",
price: "",
imageUrl: "",
category: "",
stock: "",
rating: "",
});

const handleChange = (e) => {

if(e.target.name === "name"){
setProduct({
...product,
name: e.target.value
})
}

if(e.target.name === "description"){
setProduct({
...product,
description: e.target.value
})
}

if(e.target.name === "price"){
setProduct({
...product,
price: e.target.value
})
}

if(e.target.name === "imageUrl"){
setProduct({
...product,
imageUrl: e.target.value
})
}

if(e.target.name === "category"){
setProduct({
...product,
category: e.target.value
})
}

if(e.target.name === "stock"){
setProduct({
...product,
stock: e.target.value
})
}

if(e.target.name === "rating"){
setProduct({
...product,
rating: e.target.value
})
}

};

const handleSubmit = async (e) => {
e.preventDefault(); 

try {

const res = await axios.post(
"http://localhost:5001/products",
product
);

alert("Product Added Successfully");

setProduct({
name: "",
description: "",
price: "",
imageUrl: "",
category: "",
stock: "",
rating: "",
});

} catch (error) {
console.log(error);
alert("Error adding product");
}
};

return (

<div className="add-product-page">

<div className="add-product-container">

<h2>Add New Product</h2>

<form onSubmit={handleSubmit}>

<div className="form-group">
<label>Product Name</label>
<input
 type="text"
 name="name"
 value={product.name}
 onChange={handleChange}
 required
/>
</div>

<div className="form-group">
<label>Description</label>
<textarea
 name="description"
 value={product.description}
 onChange={handleChange}
 required
/>
</div>

<div className="form-row">

<div className="form-group">
<label>Price</label>
<input
 type="number"
 name="price"
 value={product.price}
 onChange={handleChange}
 required
/>
</div>

<div className="form-group">
<label>Stock</label>
<input
 type="number"
 name="stock"
 value={product.stock}
 onChange={handleChange}
 required
/>
</div>

</div>

<div className="form-group">
<label>Image URL</label>
<input
 type="text"
 name="imageUrl"
 value={product.imageUrl}
 onChange={handleChange}
 required
/>
</div>

<div className="form-row">

<div className="form-group">
<label>Category</label>
<select
 name="category"
 value={product.category}
 onChange={handleChange}
 required
>
<option value="">Select Category</option>
<option value="electronics">Electronics</option>
<option value="fashion">Fashion</option>
<option value="mobile">Mobile</option>
<option value="laptop">Laptop</option>
<option value="accessories">Accessories</option>
</select>
</div>

<div className="form-group">
<label>Rating</label>
<input
 type="number"
 name="rating"
 value={product.rating}
 onChange={handleChange}
 min="1"
 max="5"
 step="1"
/>
</div>

</div>

<button className="add-btn">
Add Product
</button>

</form>

</div>

</div>

);

};

export default AddProduct;



// # Backend Route Example

// useEffect(()=>{
// axios.get("http://localhost:5001/products")
// .then(res => setProducts(res.data))
// },[])

// Add Product → Database → Fetch Products → Show Products
