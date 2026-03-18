// LISTAR USERS
app.get("/users", (req,res)=>{
 res.json(users);
});

// ADD SALDO ADMIN
app.post("/add", (req,res)=>{
 let user = users.find(u=>u.email===req.body.email);
 user.saldo += 100;
 res.json(user);
});
