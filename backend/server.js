const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// CONEXÃO MONGO
mongoose.connect("mongodb://127.0.0.1:27017/dot77");

// MODEL
const User = mongoose.model("User", {
 email:String,
 saldo:Number
});

// LOGIN
app.post("/login", async (req,res)=>{
 let {email} = req.body;

 let user = await User.findOne({email});

 if(!user){
   user = await User.create({email, saldo:100});
 }

 let token = Buffer.from(email).toString("base64");

 res.json({user, token});
});

// AUTH
async function auth(req,res,next){
 let token = req.headers.authorization;
 let email = Buffer.from(token,"base64").toString("utf8");

 req.user = await User.findOne({email});
 next();
}

// SALDO
app.get("/saldo", auth, (req,res)=>{
 res.json(req.user);
});

app.listen(3000, ()=>console.log("DOT77 rodando"));
