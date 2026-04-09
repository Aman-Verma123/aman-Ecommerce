// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import Products from './pages/products.jsx'
import Cart from './pages/cart.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/sign.jsx'
import Welcome from './pages/welcome'
import Navbar from './pages/navbar.jsx'
import Profile from './pages/userprofile.jsx'
import ProfileEdit from './pages/profileedit.jsx'
import Orders from './pages/order.jsx'
import AddProduct from "./pages/addproduct.jsx";
import ProductDetails from './pages/productDetails.jsx'

import OrderSuccess from "./pages/orderSuccess";



createRoot(document.getElementById('root')).render(
 
<BrowserRouter>
       <Navbar />
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/" element={<Welcome/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/orders" element={<Orders />} /> */}
      <Route path="/orders/:id" element={<Orders />} />
      <Route path="/add_product" element={<AddProduct/>}/>
      <Route path="/product/:id" element={<ProductDetails />} />
     <Route path="/order-success" element={<OrderSuccess />} />
    
    </Routes>
 
</BrowserRouter>
)
