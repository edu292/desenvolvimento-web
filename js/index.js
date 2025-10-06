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

    window.location.assign("home/index.html");
});