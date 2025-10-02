const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
})

function login(){
    const resposta = {email: loginForm.email.value, password: loginForm.senha.value};

    localStorage.setItem("sessao", JSON.stringify(resposta));

    window.location.assign("home/index.html");
}