if (!localStorage.getItem("sessao")) {
    window.location.assign("../index.html");
}

const exitButton = document.getElementById("exit-button");
exitButton.addEventListener("click",function(){
    localStorage.removeItem('sessao');
    window.location.assign("../index.html");
})