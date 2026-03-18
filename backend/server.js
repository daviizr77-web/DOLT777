let historico = [];
let chat = [];

// APOSTA
app.post("/apostar", (req,res)=>{
 let user = users.find(u=>u.email===req.body.email);

 let valor = Number(req.body.valor);
 user.saldo -= valor;

 let resultado = Math.random() > 0.5;

 if(resultado){
   user.saldo += valor*2;
 }

 historico.push({
   email:user.email,
   valor,
   ganhou:resultado
 });

 res.json(user);
});

// HISTÓRICO
app.get("/historico",(req,res)=>{
 res.json(historico);
});
