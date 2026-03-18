const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// LOGIN
app.post("/login", (req, res) => {
 const { email } = req.body;

 let user = users.find(u => u.email === email);

 if(!user){
  user = { email, saldo:100 };
  users.push(user);
 }

 let token = "token-"+email;

 res.json({user, token});
});

// PROTEGIDO
app.get("/saldo", (req, res) => {
 let token = req.headers.authorization;

 let email = token.replace("token-","");
 let user = users.find(u => u.email === email);

 res.json(user);
});

app.listen(3000);
