
import React from "react";
import "../css/userprofile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // const loginedUser = JSON.parse(localStorage.getItem("user"));
  const loginedUser = JSON.parse(localStorage.getItem("user")) || {};

const [currentUser, setCurrentUser] =  useState({
  
  _id: loginedUser._id || null,
  name: loginedUser.name || "User Not Logged In",
  email: loginedUser.email || "User Not Logged In",

});

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};


const savetoDB = () => {
  axios.post("http://localhost:5001/update-profile", currentUser)
    .then(response => {

      alert("Profile updated successfully!");

      console.log("Profile updated successfully:", response.data);

      // Update state
      setCurrentUser(response.data);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

    })
    .catch(error => {
      console.error("Error updating profile:", error);
    });
};   


return (

<div className="profile-container">

<div className="profile-card">

<div className="profile-header">

<div className="profile-image">
<img src="https://i.pravatar.cc/150?img=3" alt="user" />
</div>

<h2>Name: {currentUser.name }</h2>
<p>Email: {currentUser.email }</p>

</div>


<div className="profile-body">

<div className="profile-info">

<div className="info-box">
<h4>Orders</h4>
<span>12</span>
</div>

<div className="info-box">
<h4>Wishlist</h4>
<span>5</span>
</div>

<div className="info-box">
<h4>Cart Items</h4>
<span>3</span>
</div>

</div>


<div className="profile-details">

  <h2>Edit Name and Email</h2>
<br />
<div className="detail">
<label>Full Name</label>
<input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})} />
</div>

<div className="detail">
<label>Email</label>
<input type="text" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} /> 
</div>


</div>


<div className="profile-actions">

    <button onClick={savetoDB} className="save-btn edit-btn">Save Changes</button>

  <Link to="/profile/edit" className="edit-btn">Edit Profile</Link>
{/* <button className="edit-btn">Edit Profile</button> */}
<button className="logout-btn" onClick={handleLogout}>Logout</button>
</div>

 
</div>

</div>

</div>

);

};

export default Profile;





// * Edit Profile functionality
// * Upload Profile Image
// * Orders History Section
// * Address Management
