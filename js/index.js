const loginForm = document.getElementById('login-form');
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const sessao = listaUsuarios.find((usuario) => usuario.email === loginForm.email.value && usuario.senha === loginForm.senha.value);

    if (!sessao) {
        loginForm['output-login-invalido'].value = 'Senha ou email inválidos';
        return;
    }

    localStorage.setItem("sessao", JSON.stringify(sessao));

    if (sessao["tipo-usuario"] == "doador"){
        window.location.assign("home/doador.html");
    }else if (sessao["tipo-usuario"] == "receptor"){
        window.location.assign("home/receptor.html");
    }else if(sessao["tipo-usuario"] == "transportador"){
        window.location.assign("home/transportador.html")
    }
});