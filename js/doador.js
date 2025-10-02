function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

const tableBody = document.getElementById('table-body');
let listaClientes = []
if (localStorage.getItem("listaDoacoes")) {
    listaClientes = JSON.parse(localStorage.getItem("listaDoacoes"));
}

function carregarItens(){
    if (listaClientes && listaClientes.length > 0) {
        let html = "";
        listaClientes.forEach((doacao, id) => {
            html += "<tr>";
            html += `<td>${doacao.titulo}</td>`;
            html += `<td>${doacao.descricao}</td>`;
            html += `<td>${doacao.status}</td>`;
            html += `<td>${doacao.vencimento}</td>`;
            if (doacao.status === 'Disponível') {
                html += `<td><a href="javascript:excluir(${id})">Excluir</a></td>`;
                html += `<td><a href="formulario_doador.html?id=${id}">Atualizar</a></td>`;
            } else if (doacao.status === 'Aceita') {
                html += `<td colspan="2"><a href="#">Contactar receptor</a></td>`;
            } else {
                html += `<td><a href="#">Contactar transportador</a></td>`;
                html += `<td><a href="#">Contactar receptor</a></td>`;
            }
            html += "</tr>";
        });
        tableBody.innerHTML = html;
    }
}

function excluir(id){
    listaClientes.splice(id,1);
    localStorage.setItem("listaDoacoes", JSON.stringify(listaClientes));
    window.location.reload();
}

carregarItens();