function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

const formularioAlimento = document.getElementById('formulario-alimento');
const idAlimento = new URLSearchParams(window.location.search).get('id');
const dbAlimento = JSON.parse(localStorage.getItem("dbAlimento")) || [];

if (idAlimento && dbAlimento[idAlimento]) {
    const alimento = dbAlimento[idAlimento];
    for (const key in alimento) {
        if (formularioAlimento[key]) {
            formularioAlimento[key].value = alimento[key];
        }
    }
}

formularioAlimento.addEventListener('submit', (event) => {
    event.preventDefault();

    const dadosFormulario = new FormData(formularioAlimento);
    const alimentoAtualizado = Object.fromEntries(dadosFormulario.entries());

    if (idAlimento !== null) {
        dbAlimento[idAlimento] = alimentoAtualizado;
    } else {
        dbAlimento.push(alimentoAtualizado);
    }

    localStorage.setItem("dbAlimento", JSON.stringify(dbAlimento));

    window.location.assign('index.html');
});
