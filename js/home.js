const retorno = document.getElementById("retorno");
if(localStorage.getItem("sessao")){
    const sessao = JSON.parse(localStorage.getItem("sessao"));
    retorno.textContent = "Seja bem vindo " + sessao.email;
}else{
    window.location.assign("../index.html");
}

const exitButton = document.getElementById("exit-button");
exitButton.addEventListener("click",function(){
    localStorage.removeItem('sessao');
    window.location.assign("../index.html");
})