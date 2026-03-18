const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");

const router = express.Router();

// LOGIN / REGISTRO
router.post("/login", async (req,res)=>{
 const {email, senha} = req.body;

 let user = db.findUser(email);

 if(!user){
  const hash = await bcrypt.hash(senha, 8);
  user = db.createUser({email, senha:hash});
 }

 const token = jwt.sign({id:user.id}, "SEGREDO");

 res.json({token, user});
});

// DEPOSITO
router.post("/depositar", (req,res)=>{
 const {email, valor} = req.body;
 let user = db.updateSaldo(email, valor);
 res.json(user);
});

// SAQUE
router.post("/sacar", (req,res)=>{
 const {email, valor} = req.body;
 let user = db.findUser(email);

 if(user && user.saldo >= valor){
  user.saldo -= valor;
 }

 res.json(user);
});

// ADMIN
router.get("/admin/users", (req,res)=>{
 res.json(db.getUsers());
});

module.exports = router;
