const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
})

async function login(){
    const loginFormData = new FormData(loginForm);

    const retorno = await fetch("/php/login.php",{
        method: "POST",
        body: loginFormData
    });

    const resposta = await retorno.json();

    localStorage.setItem("sessao",JSON.stringify(resposta));

    window.location.assign("home/index.html");
};

const botaocadastro = document.getElementById("cadastro");
function irParaCadastro(){
    window.location.href = "cadastro/index_cadastro.html"
};
if(botaocadastro){
    botaocadastro.addEventListener('click',irParaCadastro)
};