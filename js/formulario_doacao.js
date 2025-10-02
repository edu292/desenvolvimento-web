const formularioDoacao = document.getElementById('formulario-doacao');
const idDoacao = new URLSearchParams(window.location.search).get('id');
const listaDoacoes = JSON.parse(localStorage.getItem("listaDoacoes")) || [];

if (idDoacao !== null && listaDoacoes[idDoacao]) {
    const doacao = listaDoacoes[idDoacao];
    for (const key in doacao) {
        if (formularioDoacao[key]) {
            formularioDoacao[key].value = doacao[key];
        }
    }
}

formularioDoacao.addEventListener('submit', (event) => {
    event.preventDefault();

    const dadosFormulario = new FormData(formularioDoacao);
    const doacaoAtualizada = Object.fromEntries(dadosFormulario.entries());
    doacaoAtualizada.status = 'Disponível';

    if (idDoacao !== null) {
        listaDoacoes[idDoacao] = doacaoAtualizada;
    } else {
        listaDoacoes.push(doacaoAtualizada);
    }

    localStorage.setItem("listaDoacoes", JSON.stringify(listaDoacoes));

    window.location.assign('index.html');
});
