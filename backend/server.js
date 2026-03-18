const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// LOGIN
app.post("/login",(req,res)=>{
 let {email} = req.body;

 let user = users.find(u=>u.email===email);

 if(!user){
   user = {email, saldo:100};
   users.push(user);
 }

 let token = Buffer.from(email).toString("base64");

 res.json({user, token});
});

// MIDDLEWARE
function auth(req,res,next){
 let token = req.headers.authorization;

 if(!token) return res.sendStatus(401);

 let email = Buffer.from(token,"base64").toString("utf8");

 req.user = users.find(u=>u.email===email);

 next();
}

// SALDO PROTEGIDO
app.get("/saldo", auth, (req,res)=>{
 res.json(req.user);
});

app.listen(3000);
