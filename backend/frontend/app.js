let data = JSON.parse(localStorage.getItem("user"));

let token = data.token;

async function carregar(){
 let res = await fetch("http://localhost:3000/saldo",{
  headers:{Authorization:token}
 });

 let user = await res.json();
 saldo.innerText="Saldo: "+user.saldo;
}

carregar();
