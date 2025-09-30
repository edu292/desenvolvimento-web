function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

const tableBody = document.getElementById('table-body');
let listaClientes = []
if (localStorage.getItem("listaClientes")) {
    listaClientes = JSON.parse(localStorage.getItem("listaClientes"));
}

function carregarItens(){
    if (listaClientes && listaClientes.length > 0) {
        let html = "";
        listaClientes.forEach((cliente, id) => {
            html += "<tr>";
            html += `<td>${cliente.nome}</td>`;
            html += `<td>${cliente.email}</td>`;
            html += `<td>${cliente.nasc}</td>`;
            html += `<td><a href="javascript:excluir(${id})">Excluir</a></td>`;
            html += `<td><a href="formulario_cliente.html?id=${id}">Atualizar</a></td>`;
            html += "</tr>";
        });
        tableBody.innerHTML = html;
    }
}

function excluir(id){
    listaClientes.splice(id,1);
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));
    window.location.reload();
}

carregarItens();