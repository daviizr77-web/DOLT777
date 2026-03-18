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

  if (!user) {
    user = { email, saldo: 100 };
    users.push(user);
  }

  res.json(user);
});

// SALDO
app.get("/saldo/:email", (req, res) => {
  let user = users.find(u => u.email === req.params.email);
  res.json(user);
});

// DEPOSITO
app.post("/deposito", (req, res) => {
  let user = users.find(u => u.email === req.body.email);
  user.saldo += Number(req.body.valor);
  res.json(user);
});

// SAQUE
app.post("/saque", (req, res) => {
  let user = users.find(u => u.email === req.body.email);
  user.saldo -= Number(req.body.valor);
  res.json(user);
});

app.listen(3000, () => console.log("Servidor rodando"));
