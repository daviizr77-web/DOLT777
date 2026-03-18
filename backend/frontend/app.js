let user = JSON.parse(localStorage.getItem("user"));

async function atualizar(){
 let res = await fetch("http://localhost:3000/saldo/"+user.email);
 let data = await res.json();

 saldo.innerText = "Saldo: "+data.saldo;
}

atualizar();
