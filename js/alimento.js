function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

const corpoTabela = document.getElementById('corpo-tabela');
const dbAlimento = JSON.parse(localStorage.getItem('dbAlimento')) ?? []


function carregarItens(){
    if (dbAlimento && dbAlimento.length > 0) {
        let html = "";
        dbAlimento.forEach((alimento, id) => {
            html += "<tr>";
            html += `<td>${alimento.nome}</td>`;
            html += `<td>${alimento.categoria}</td>`;
            html += `<td>${alimento.descricao}</td>`;
            html += `<td>${alimento.restricao}</td>`;
            html += `<td>${alimento.validade}</td>`;
            html += `<td>${alimento.armazenamento}</td>`;
            html += `<td><button class="botao vermelho" onclick="deleteAlimento(${id})">Excluir</button><button class="botao verde" onclick="window.location.assign('formulario_alimento.html?id=${id}')">Atualizar</button></td>`;
            html += "</tr>";
        });
        corpoTabela.innerHTML = html;
    }
}

function deleteAlimento (index) {
    dbAlimento.splice(index,1);
    localStorage.setItem("dbAlimento", JSON.stringify(dbAlimento));
    window.location.reload();
}

carregarItens();