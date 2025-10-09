function validarSessao(){
    return !!localStorage.getItem("sessao"); //tenta ler no localStorage a key sessao, se não existe, retorna null. !! retorna boleano
} //função retorna true se existir algo salvo em sessao, false caso contrario


if (!validarSessao()) { //if validarSessao() for false (nao tem sessao), entra no bloco
    window.location.assign('../index.html'); //manda pro index.html (assign muda a url)
}


var corpoTabela = document.getElementById('corpo-tabela'); //pega o tbody e guarda na variavel
var dbAlimento = JSON.parse(localStorage.getItem('dbAlimento')) ?? [] //pega o dbAlimento(em string) e transforma para objeto, se dbAlimento estiver null ou undefined, retorna um array vazio




function carregarItens(){ //função que vai montar as linhas da tabela na tela com base no dbAlimento
    if (dbAlimento && dbAlimento.length > 0) { //verifica se dbAlimento existe (não é null) e tem ao menos 1 item. Se for array vazio, o bloco não é executado (não mostra linhas)
        let html = ""; //variavel que vai armazenar o html das linhas da tabela (string) Começa vazia (let escopo de bloco)
        dbAlimento.forEach((alimento, id) => { //percorre por cada alimento do array dbAlimento (na posição 0,1,2,3...)
            alimento.pesoTotal = alimento['peso-unidade'] * alimento.unidades; // calcula o peso de cada unidade x a quantidade. armazena no proprio objeto
            html += "<tr>"; //abre a linha da tabela
            html += `<td>${alimento.nome}</td>`; //insere o valor alimento.nome dentro de uma celula da tabela
            html += `<td>${alimento.categoria}</td>`;
            html += `<td>${alimento.pesoTotal}</td>`;
            html += `<td>${alimento.unidades}</td>`;
            html += `<td><button class="botao vermelho" onclick="deleteAlimento(${id})">Excluir</button><button class="botao verde" onclick="window.location.assign('formulario_alimento.html?id=${id}')">Atualizar</button></td>`; //Excluir chama deleteAlimento(${id})via onclick // window.location representa o endereço atual da página. .assign(endereço) muda a página atual para outro endereço. (como se fosse <a href="">)
            html += "</tr>"; // fecha a linha da tabela
        });
        corpoTabela.innerHTML = html; //inesere todo html gerado dentro do tbody (aparecer na tela)
    }
}


function deleteAlimento (index) { //função para remover item do dbAlimento pelo indice
    dbAlimento.splice(index,1); // remove o item do indice(index)
    localStorage.setItem("dbAlimento", JSON.stringify(dbAlimento)); //transforma en string e salva o array atualizado no localStorage
    window.location.reload(); //recarrega a pagina
}


carregarItens(); //chama a função