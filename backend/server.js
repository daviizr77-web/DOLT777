const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// LOGIN / REGISTRO
app.post("/login", (req,res)=>{
 let {email} = req.body;

 let user = users.find(u => u.email === email);

 if(!user){
  user = {email, saldo:1000};
  users.push(user);
 }

 res.json(user);
});

// LISTAR USUÁRIOS (ADMIN)
app.get("/admin/users", (req,res)=>{
 res.json(users);
});

// ALTERAR SALDO
app.post("/admin/saldo", (req,res)=>{
 let {email, valor} = req.body;

 let user = users.find(u => u.email === email);
 if(user){
  user.saldo += valor;
 }

 res.json(user);
});

// DEPOSITO
app.post("/depositar", (req,res)=>{
 let {email, valor} = req.body;

 let user = users.find(u => u.email === email);
 if(user){
  user.saldo += valor;
 }

 res.json(user);
});

// SAQUE
app.post("/sacar", (req,res)=>{
 let {email, valor} = req.body;

 let user = users.find(u => u.email === email);
 if(user && user.saldo >= valor){
  user.saldo -= valor;
 }

 res.json(user);
});

app.listen(3000, ()=>console.log("Servidor rodando 🚀"));
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.listen(3000, ()=>console.log("Servidor DOLT77 🚀"));
npm install
node server.js
