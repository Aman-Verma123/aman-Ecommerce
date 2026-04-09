import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
    
    <Link to="/products">Products</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/home">Home</Link>
    <Link to="/login">Login</Link>
    </>
  )
}

export default App