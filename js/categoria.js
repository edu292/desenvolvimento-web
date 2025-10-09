function deleteCategoria(id) {
    listaCategorias.splice(id, 1);
    localStorage.setItem('listaCategorias', JSON.stringify(listaCategorias));
    window.location.reload();
}


function carregarCategorias() {
    let corpoTabelaHtml = '';

    listaCategorias.forEach((categoria, id) => {
        corpoTabelaHtml += '<tr>'
        corpoTabelaHtml += `<td>${categoria.name}</td>`
        corpoTabelaHtml += `<td>${Object.keys(categoria.items).length}</td>`
        corpoTabelaHtml += `<td>${Object.values(categoria.items).slice(0, 3).join(', ') + '...'}</td>`
        corpoTabelaHtml += `<td class="actions-cell">
                                <a href="formulario.html?id=${id}" class="action-icon edit" aria-label="Editar">
                                    <span class="tooltip">Editar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                        <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/>
                                    </svg>
                                </a>
                                <a href="javascript:deleteCategoria(${id})" class="action-icon delete" aria-label="Excluir">
                                    <svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
                                </a>
                            </td>`
    });
    corpoTabela.innerHTML = corpoTabelaHtml;
}


const corpoTabela = document.getElementById('corpo-tabela');
const listaCategorias = JSON.parse(localStorage.getItem('listaCategorias')) ?? [];
carregarCategorias();