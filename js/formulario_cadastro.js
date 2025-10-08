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
    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    usuario.id = listaUsuarios.length;

    localStorage.setItem('sessao', JSON.stringify(usuario));
    listaUsuarios.push(usuario);

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    if (usuario["tipo-usuario"] === "doador"){
        window.location.assign("home/doador.html");
    }else if (usuario["tipo-usuario"] === "receptor"){
        window.location.assign("home/receptor.html");
    }else if(usuario["tipo-usuario"] === "transportador"){
        window.location.assign("home/transportador.html")
    }
});