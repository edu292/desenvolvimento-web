const loginForm = document.getElementById('login-form');
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [{email: 'admin', senha: 'admin123', tipoUsuario: 'admin'}];

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const sessao = listaUsuarios.find((usuario) => usuario.email === loginForm.email.value && usuario.senha === loginForm.senha.value);

    if (!sessao) {
        loginForm['output-login-invalido'].value = 'Senha ou email inválidos';
        return;
    }

    localStorage.setItem("sessao", JSON.stringify(sessao));

    if (sessao.tipoUsuario === "doador"){
        window.location.assign("home/doador.html");
    } else if (sessao.tipoUsuario === "receptor"){
        window.location.assign("home/receptor.html");
    } else if(sessao.tipoUsuario === "transportador") {
        window.location.assign("home/transportador.html")
    }
});