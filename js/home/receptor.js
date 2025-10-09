const listaDoacoes = JSON.parse(localStorage.getItem("listaDoacoes"));
const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
const sessao = JSON.parse(localStorage.getItem('sessao'));
let doacoesAceitas = JSON.parse(localStorage.getItem("doacoesAceitas")) ?? [];
botaoSair = document.getElementById("botao-sair");

if (!sessao || sessao.tipoUsuario !== 'receptor') {
    window.location.assign('../index.html');
}


function carregarCards(){
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (listaDoacoes.length > 0){
        listaDoacoes.forEach((doacao, id) => {
            let idDoador = listaDoacoes[id].idUsuario
            let titulo = listaDoacoes[id].titulo
            let quantidade = listaDoacoes[id].unidades
            let peso = listaDoacoes[id].peso

            let doador = listaUsuarios[idDoador];
            let endereco = doador.logradouro + ", " + doador.numeroEndereco + " - " + doador.cidade;

            const card_unico = `card-${id}`;

            const cardHTML = `
                <div class="card-doacao" id="${card_unico}"> <div class="card-header">
                        <h4 class="card-title">${titulo}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-info"><strong>Quantidade:</strong> ${quantidade} unidades</p>
                        <p class="card-info"><strong>Peso Total:</strong> ${peso} kg</p>
                        <p class="card-info"><strong>Localização:</strong> ${endereco}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-aceitar" onclick="doacaoAceita(${id}, '${card_unico}')">Aceitar</button>
                    </div>
                </div>
            `;

            container.innerHTML += cardHTML;
        })

    }else{
        const msgHTML = '<h2>Não tem doações ofertadas!<h2>'
        container.innerHTML += cardHTML;
    }
}


function doacaoAceita(idDoacao, card_unico) {
    const doacao = listaDoacoes[idDoacao];

    if (doacao) {
        doacao.status = 'aceito';

        const novoRegistro = {
            idDoacao: doacao.id, 
            idReceptor: sessao.id 
        };
        
        doacoesAceitas.push(novoRegistro);
        listaDoacoes.splice(idDoacao, 1)

        localStorage.setItem('listaDoacoes', JSON.stringify(listaDoacoes));
        localStorage.setItem('doacoesAceitas', JSON.stringify(doacoesAceitas)); 

        const card = document.getElementById(card_unico); 
        if (card) {
            card.remove();
        }

    }
}

function sair() {
    window.localStorage.removeItem("sessao");
    window.location.href = '../index.html';
}

botaoSair.addEventListener('click', sair);

carregarCards();

