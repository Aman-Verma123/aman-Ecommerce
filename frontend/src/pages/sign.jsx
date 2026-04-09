
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5001/signup",
      { name, email, password }
    );

    if (response.status === 201) {
      alert("Signup successful!");
      console.log("Signup successful!", response.data);
      setTimeout(() => {
         navigate("/login");
      }, 1500);
    } else {
      alert("Signup failed. Please try again.");
    }

  } catch (error) {


    alert(`Signup failed: ${error.response?.data?.message || error.message} `);
    console.error(
      "Signup failed:",
      error.response?.data || error.message
    );
  }
};
  return (

<div className="signup-container">

<div className="signup-card">

<div className="signup-header">
<h2>Create Account</h2>
<p>Join us and start shopping today</p>
</div>

<form onSubmit={handleSubmit}>

<div className="input-group">
<label>Full Name</label>
<input
 type="text"
 placeholder="Enter your name"
 value={name}
 onChange={(e)=>setName(e.target.value)}
 required
/>
</div>

<div className="input-group">
<label>Email Address</label>
<input
 type="email"
 placeholder="Enter your email"
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
 required
/>
</div>

<div className="input-row">

<div className="input-group">
<label>Password</label>
<input
 type="password"
 placeholder="Password"
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 required
/>
</div>

<div className="input-group">
<label>Confirm Password</label>
<input
 type="password"
 placeholder="Confirm"
 value={confirmPassword}
 onChange={(e)=>setConfirmPassword(e.target.value)}
 required
/>
</div>

</div>

<button className="signup-btn">Create Account</button>

</form>

<p className="login-link">
Already have an account? <Link to="/login">Login</Link>
</p>

</div>

</div>

  );
};

export default Signup;

