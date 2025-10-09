sessao = JSON.parse(localStorage.getItem('sessao'));
if (!sessao || sessao.tipoUsuario !== 'doador') {
    window.location.assign('../index.html');
}

const botaoSair = window.document.getElementById('botao-sair');
const cardsContainer = window.document.querySelector('.cards-container');
const listaDoacoes = JSON.parse(localStorage.getItem('listaDoacoes')) ?? [];
const doacoesUsuario = listaDoacoes.filter(doacao => doacao.idUsuario === sessao.id);

function sair() {
    window.localStorage.removeItem("sessao");
    window.location.href = '../index.html';
}


function carregarDoacoes() {
    let htmlCards;
    if (!doacoesUsuario || doacoesUsuario.length === 0) {
        htmlCards = `
            <div style="
                text-align: center; 
                padding: 30px; 
                color: #555; 
                width: 400px;
                margin: 0 auto;
            ">
                <h2>Nenhuma doação cadastrada ainda.</h2>
                <p>Use o botão "Criar Doação" para cadastrar sua primeira doação!</p>
            </div>`;
    } else {
        htmlCards = '';
        doacoesUsuario.forEach((doacao) => {
            htmlCards += `
                <a href="../doacao/formulario.html?id=${doacao.id}">
                <div class="card-doacao">
                    <h4>${doacao.titulo}</h4>
                    <p>Quantidade de Itens: ${doacao.unidades}</p>
                    <p>Peso Total (Kg): ${doacao.peso}</p>
                    <p>Status: ${doacao.status}</p>
                </div>
                </a>
            `;
        });
    }
    cardsContainer.innerHTML = htmlCards;
}

botaoSair.addEventListener('click', sair);

carregarDoacoes();