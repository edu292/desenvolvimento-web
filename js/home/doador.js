
const botao_sair = window.document.getElementById('botao_sair'); 
const botao_gerenciar = window.document.getElementById('botao_gerenciar');
const cards_doacoes_pai = window.document.querySelector('.cards_doacoes_pai');
const KEY_DOACOES = 'dbAlimento'; 

function sair(){
    window.localStorage.removeItem("sessao");
    window.location.href = '../index.html'; 
}

function gerenciar_alimentos(){
    window.location.href = '../alimento/index.html';
}




function carregarDoacoes() {
    const dbAlimentoJSON = localStorage.getItem(KEY_DOACOES);

    if (!dbAlimentoJSON || dbAlimentoJSON === '[]'){

        cards_doacoes_pai.innerHTML = `
            <div style="
                text-align: center; 
                padding: 30px; 
                color: #555; 
                width: 400px; /* Largura que comporta o texto */
                margin: 0 auto; /* Centraliza a div */
            ">
                <h2>Nenhuma doação cadastrada ainda.</h2>
                <p>Use o botão "Gerenciar alimentos" para cadastrar sua primeira doação!</p>
            </div>`;
    } else {
        const dbAlimento = JSON.parse(dbAlimentoJSON);
        let htmlCards = '';

        dbAlimento.forEach((doacao) => {

            const doacaoString = JSON.stringify(doacao).replace(/"/g, '&quot;');
            
            htmlCards += `
                <div class="card-doacao-item">
                    <h4>${doacao.nome}</h4>
                    <p>Validade: ${doacao.validade}</p>
                    <p>Categoria: ${doacao.categoria}</p>
                    <p>Armazenamento: ${doacao.armazenamento}</p>
                    <p>Restrição: ${doacao.restricao}</p>
                    <p>Descrição: ${doacao.descricao}</p></br>
                </div>
            `;
        });
        cards_doacoes_pai.innerHTML = htmlCards;
    }
}



carregarDoacoes(); 

botao_gerenciar.addEventListener('click', gerenciar_alimentos);
botao_sair.addEventListener('click', sair);
