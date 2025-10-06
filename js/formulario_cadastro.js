const formularioCadastro = document.getElementById('formulario-cadastro');
const msgError = document.getElementById('senha-invalida');


formularioCadastro.addEventListener("submit", (event)=>{
    if (formularioCadastro.senha.value !== formularioCadastro.ConfirmarSenha.value) {
        msgError.innerText = 'Verifique se as senhas são iguais'
        event.preventDefault()}

})