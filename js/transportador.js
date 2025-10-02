const main = document.querySelector('main');
let listaDoacoes = []
if (localStorage.getItem("listaDoacoes")) {
    listaDoacoes = JSON.parse(localStorage.getItem("listaDoacoes"));
}

function carregarItens(){
    if (listaDoacoes && listaDoacoes.length > 0) {
        let html = "";
        listaDoacoes.forEach((doacao, id) => {
            if (doacao.status === 'Disponível') {
                return
            }

            html += "<div class='card'>";
            html += `<h2>Entrega</h2>`;
            html += `<p>${doacao.descricao}</p>`;
            html += `<p>Endereço doador: Rua nilson dos santo, 349</p>`;
            html += `<p>Endereço receptor: Rua anhanguera, 3579</p>`
            html += '<div class="button-wrapper">'
            if (doacao.status === 'Aceita') {
                html += `<button data-role="aceitar" data-id="${id}">Aceitar</button>`;
            } else if (doacao.status === 'Transporte') {
                html += `<button data-role="cancelar" data-id="${id}">Cancelar</button>`;
                html += `<button data-role="entregar" data-id="${id}">Marcar como entregue</button>`;
            }
            html += '</div>';
            html += "</div>";
        });
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
        doacao.status = 'Transporte';
    } else if (role === 'cancelar') {
        doacao.status = 'Aceita';
    } else if (role === 'entregar') {
        doacao.status = 'Concluida';
    }
    localStorage.setItem("listaDoacoes", JSON.stringify(listaDoacoes));
    window.location.reload();
});

carregarItens();