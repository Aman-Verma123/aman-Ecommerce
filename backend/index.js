import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import Product from "./models/product.js";
import Order from './models/order.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();
// ............................................................


app.use(cors({
  origin: "https://aman-ecommerce-frontend.onrender.com",
  credentials: true
}));
//...............................

app.use(express.json());

connectDB();

console.log("PORT FROM ENV:", process.env.PORT);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.post("/signup", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});



// =======================
// Login Route
// =======================

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Create Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email
      // }
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }

});



// ------------add product route------------------
app.post("/products", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating
    } = req.body;

    // Validation
    if (!name || !description || !price || !imageUrl || !category || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    // Create Product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating
    });

    // Save
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct
    });

  } catch (error) {
    console.error("Add Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});


// Get All Products
app.get("/products", async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products"
    });
  }
});



app.post("/update-profile", async (req, res) => {

  const { _id, name, email } = req.body;

  try {

    const updatedUser = await User.findByIdAndUpdate(

      _id,
      { name, email },
      // { new: true }
      { returnDocument: "after" }

    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(updatedUser);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// view product item in details
app.get("/product/:id", async (req,res) => {
  const {id} = req.params;
  try{
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({
        message: "Product not found"
      });
    }


    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product"
    });
  }
})

// product deleting req:
app.delete("/product/:id", async (req,res) => {
  const {id} = req.params;
  try{
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product"
    });
  }
})



app.post("/orders", async (req,res)=>{

console.log("Order Request:", req.body);

try{

const newOrder = new Order(req.body);

await newOrder.save();

res.status(200).json({
message:"Order Placed Successfully",
order:newOrder
});
 
}
catch(err){
res.status(500).json({error:err.message});
}

});


app.get("/orders/:userId", async (req,res)=>{

try{

const orders = await Order.find({
userId:req.params.userId
}).sort({createdAt:-1});

res.status(200).json(orders);

}
catch(err){
res.status(500).json({error:err.message});
}

});


app.delete("/orders/:id", async (req,res)=>{

try{

const order = await Order.findByIdAndDelete(req.params.id);

if(!order){
return res.status(404).json({
message:"Order not found"
});
}

res.status(200).json({
message:"Order deleted successfully"
});

}
catch(err){
res.status(500).json({
error:err.message
});
}

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});