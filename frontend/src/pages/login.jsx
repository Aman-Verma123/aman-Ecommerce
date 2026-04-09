import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {

e.preventDefault();

try {

const response = await axios.post(
"http://localhost:5001/login",
{ email, password }
);

if (response.status === 200) {

alert("Login successful!");

localStorage.setItem("token", response.data.token);

localStorage.setItem(
"user",
JSON.stringify(response.data.user)
);

navigate("/");

}

}
catch (error) {

if(error.response?.status === 400){
alert("Invalid Email or Password");
}
else{
alert("Server Error. Try Again");
}

console.error(
"Login failed:",
error.response?.data || error.message
);

}

};

return (

<div className="login-container">

<div className="login-card">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<div className="input-group">
<label>Email</label>
<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>

<div className="input-group">
<label>Password</label>
<input
type="password"
placeholder="Enter your password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>

<button className="login-btn">
Login
</button>

</form>

<p className="signup-link">
Don't have an account?
<Link to="/signup">Signup</Link>
</p>

</div>

</div>

);

};

export default Login;