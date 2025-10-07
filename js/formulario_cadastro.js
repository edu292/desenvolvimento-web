const formularioCadastro = document.getElementById('formulario-cadastro');

formularioCadastro.addEventListener("submit", (event)=>{
    event.preventDefault()
    if (formularioCadastro.senha.value !== formularioCadastro['confirmar-senha'].value) {
        formularioCadastro['output-senha-invalida'].value = 'Verifique se as senhas são iguais'
        return
    }
    formularioCadastro['confirmar-senha'].disabled = true;

    const formData = new FormData(formularioCadastro);
    const usuario = Object.fromEntries(formData.entries());

    localStorage.setItem('sessao', JSON.stringify(usuario));

    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    listaUsuarios.push(usuario);

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    window.location.assign('index.html');
});