function completarFormularioAlimento(value) {
    valueAlimento = value;
    formularioAlimento.alimento.value = alimentos[valueAlimento];
}


function carregarLinhasTabelaAlimentos(){
    let tbodyHtml = '';
    for (const [value, name] of Object.entries(alimentos)) {
        tbodyHtml += "<tr>";
        tbodyHtml += `<td>${value}</td>`;
        tbodyHtml += `<td><button class="vermelho" onclick="deleteAlimento('${value}')">Excluir</button><button class="verde" onclick="completarFormularioAlimento('${value}')">Atualizar</button></td>`;
        tbodyHtml += "</tr>";
    }
    corpoTabela.innerHTML = tbodyHtml;
}

function deleteAlimento(value) {
    delete alimentos[value];
    if (value === valueAlimento) {
        formularioAlimento.reset();
    }
    carregarLinhasTabelaAlimentos();
}

function gerarValue(name) {
    const normalized = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const words = normalized
        .split(/\s+/)
        .filter(word => word.length >= 3);

    return words.join('-');
}


const formularioCategoria = document.getElementById('formulario-categoria');
const formularioAlimento = document.getElementById('formulario-alimento');
const corpoTabela = document.getElementById('corpo-tabela');
const listaCategorias = JSON.parse(localStorage.getItem("listaCategorias")) ?? [];
const idCategoria = new URLSearchParams(window.location.search).get('id');
let valueAlimento = null;
let alimentos;
let valueCategoria;
if (!idCategoria) {
    alimentos = {};
    valueCategoria = null
} else {
    const categoria = listaCategorias[idCategoria];
    formularioCategoria.name.value = categoria.name;
    alimentos = categoria.items;
    valueCategoria = categoria.value;
    carregarLinhasTabelaAlimentos();
}


formularioAlimento.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameAlimento = formularioAlimento.alimento.value;

    if (valueAlimento !== null) {
        alimentos[valueAlimento] = nameAlimento;
        valueAlimento = null;
    } else {
        console.log(gerarValue(nameAlimento));
        alimentos[gerarValue(nameAlimento)] = nameAlimento;
    }
    console.log(alimentos);
    carregarLinhasTabelaAlimentos();
    formularioAlimento.reset();
});

formularioAlimento.addEventListener('reset', () => {
    valueAlimento = null;
});

formularioCategoria.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = formularioCategoria.elements.name.value;

    const categoria = {name: name, value: '', items: alimentos};
    if (!valueCategoria) {
        categoria.value = gerarValue(name);
    } else {
        categoria.value = valueCategoria;
    }

    if (!idCategoria) {
        listaCategorias.push(categoria);
    } else {
        listaCategorias[idCategoria] = categoria;
    }

    localStorage.setItem("listaCategorias", JSON.stringify(listaCategorias));

    window.location.assign('../categoria/index.html')
})
