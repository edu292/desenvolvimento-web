function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

const main = document.querySelector('main');
let listaDoacoes = []
if (localStorage.getItem("listaDoacoes")) {
    listaDoacoes = JSON.parse(localStorage.getItem("listaDoacoes"));
}

function carregarItens(){
    if (listaDoacoes && listaDoacoes.length > 0) {
        let html = "";
        listaDoacoes.forEach((doacao, id) => {
            html += "<div class='card'>";
            html += `<h2>${doacao.titulo}</h2>`;
            html += `<p>${doacao.descricao}</p>`;
            html += `<p>Vencimento: ${doacao.vencimento}</p>`;
            if (doacao.status === 'Aceita') {
                html += '<p>Esperando Entregador</p>'
            } else if (doacao.status === 'Transporte') {
                html += '<p>Doação em Transporte</p>'
            }
            html += '<div class="button-wrapper">'
            if (doacao.status === 'Disponível') {
                html += `<button data-role="aceitar" data-id="${id}">Aceitar</button>`;
            } else if (doacao.status !== 'Concluida') {
                html += `<button data-role="cancelar" data-id="${id}">Cancelar</button>`;
            }
            html += '</div>';
            html += "</div>";
        });
        console.log(html);
        main.innerHTML = html;
    }
}

main.addEventListener("click", (event) => {
    const botaoClicado = event.target.closest('button');
    if (!botaoClicado) {
        return
    }
    const idDoacao = botaoClicado.dataset.id;
    const doacao = listaDoacoes[idDoacao];
    const role = botaoClicado.dataset.role;
    if (role === 'aceitar') {
        doacao.status = 'Aceita';
    } else if (role === 'cancelar') {
        doacao.status = 'Disponível';
    }
    localStorage.setItem("listaDoacoes", JSON.stringify(listaDoacoes));
    window.location.reload();
});

carregarItens();