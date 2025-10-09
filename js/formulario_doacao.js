const categorias = [
    {
        value: "graos-cereais",
        name: "Grãos e Cereais",
        items: {
            "arroz": "Arroz",
            "feijao-preto": "Feijão Preto",
            "feijao-carioca": "Feijão Carioca",
            "lentilha": "Lentilha",
            "milho-pipoca": "Milho de Pipoca",
            "macarrao": "Macarrão",
            "farinha-trigo": "Farinha de Trigo",
            "fuba": "Fubá",
            "aveia": "Aveia"
        }
    },
    {
        value: "enlatados-conservas",
        name: "Enlatados e Conservas",
        items: {
            "milho-conserva": "Milho em Conserva",
            "ervilha-conserva": "Ervilha em Conserva",
            "molho-tomate": "Molho de Tomate",
            "atum-lata": "Atum em Lata",
            "sardinha-lata": "Sardinha em Lata"
        }
    },
    {
        value: "oleos-temperos-acucares",
        name: "Óleos, Temperos e Açúcares",
        items: {
            "oleo-soja": "Óleo de Soja",
            "sal-refinado": "Sal Refinado",
            "acucar-refinado": "Açúcar Refinado",
            "cafe-po": "Café em Pó",
            "achocolatado-po": "Achocolatado em Pó",
            "leite-po": "Leite em Pó",
            "leite-condensado": "Leite Condensado",
            "creme-leite": "Creme de Leite"
        }
    },
    {
        value: "biscoitos-paes",
        name: "Biscoitos e Pães",
        items: {
            "biscoito-cream-cracker": "Biscoito Cream Cracker",
            "biscoito-recheado": "Biscoito Recheado",
            "pao-forma": "Pão de Forma",
            "pao-integral": "Pão Integral"
        }
    },
    {
        value: "bebidas",
        name: "Bebidas",
        items: {
            "leite": "Leite",
            "suco-caixa": "Suco em Caixa",
            "suco-po": "Suco em Pó"
        }
    }
];


function carregarOpcoesSelects() {
    let selectNomeHtml = '<option value="" disabled selected>-- Selecione --</option>';
    let selectCategoriaHtml = '<option value="" disabled selected>-- Selecione --</option>';
    categorias.forEach(categoria => {
        selectCategoriaHtml += `<option value="${categoria.value}">${categoria.name}</option>`;
        selectNomeHtml += `<optgroup label="${categoria.name}" data-value="${categoria.value}">`;
        for (const [itemId, itemName] of Object.entries(categoria.items)) {
            selectNomeHtml += `<option value="${itemId}">${itemName}</option>`;
        }
        selectNomeHtml += '</optgroup>';
    })
    selectNomeHtml += '<option value="outro">Outro</option>';
    selectCategoriaHtml += '<option value="outro">Outro</option>';

    formularioAlimento.nome.innerHTML = selectNomeHtml;
    formularioAlimento.categoria.innerHTML = selectCategoriaHtml;
}


function opcaoValida(selectElement, optionToCheck) {
    return Array.from(selectElement.options).some(option => option.value === optionToCheck)
}


function completarFormularioAlimento(id) {
    idAlimento = id;
    const alimento = listaAlimentos[idAlimento];
    resetNomeOutro();
    for (const key in alimento) {
        if (formularioAlimento[key]) {
            if (key === 'nome' && !opcaoValida(formularioAlimento.nome, alimento[key])) {
                formularioAlimento['nome'].value = 'outro';
                formularioAlimento['nome-outro'].value = alimento[key];
                formularioAlimento['nome-outro'].hidden = false;
                formularioAlimento['nome-outro'].required = true;
            } else {
                formularioAlimento[key].value = alimento[key];
            }
        }
    }
}


function carregarLinhasTabelaAlimentos(){
    let tbodyHtml = '';
    listaAlimentos.forEach((alimento, id) => {
        tbodyHtml += "<tr>";
        tbodyHtml += `<td>${alimento.nome}</td>`;
        tbodyHtml += `<td>${alimento.categoria}</td>`;
        tbodyHtml += `<td>${alimento.pesoUnidade * alimento.quantidade}</td>`;
        tbodyHtml += `<td>${alimento.quantidade}</td>`;
        tbodyHtml += `<td><button class="botao vermelho" onclick="deleteAlimento(${id})">Excluir</button><button class="botao verde" onclick="completarFormularioAlimento(${id})">Atualizar</button></td>`;
        tbodyHtml += "</tr>";
    });
    corpoTabela.innerHTML = tbodyHtml;
}

function calcularSomaUnidadesEPesoTotal(listaAlimentos) {
    let unidades = 0;
    let pesoTotal = 0;
    listaAlimentos.forEach((alimento) => {
        unidades += parseInt(alimento.quantidade);
        pesoTotal += alimento.quantidade * alimento.pesoUnidade;
    })
    return [unidades, pesoTotal];
}


function deleteAlimento(index) {
    listaAlimentos.splice(index, 1);
    if (index === idAlimento) {
        formularioAlimento.reset();
    }
    carregarLinhasTabelaAlimentos();
}


function resetNomeOutro() {
    formularioAlimento['nome-outro'].hidden = true;
    formularioAlimento['nome-outro'].value = '';
    formularioAlimento['nome-outro'].required = false;
}


sessao = JSON.parse(localStorage.getItem('sessao'));
if (!sessao || sessao.tipoUsuario !== 'doador') {
    window.location.assign('../index.html');
}


const formularioDoacao = document.getElementById('formulario-doacao');
const formularioAlimento = document.getElementById('formulario-alimento');
const corpoTabela = document.getElementById('corpo-tabela');
const listaDoacoes = JSON.parse(localStorage.getItem("listaDoacoes")) ?? [];
const idDoacao = new URLSearchParams(window.location.search).get('id');
let idAlimento = null;
let listaAlimentos;
if (!idDoacao) {
    listaAlimentos = [];
} else {
    console.log('a')
    doacao = listaDoacoes[idDoacao];
    formularioDoacao.titulo.value = doacao.titulo;
    listaAlimentos = doacao.listaAlimentos;
    carregarLinhasTabelaAlimentos();
}

carregarOpcoesSelects();


formularioAlimento.nome.addEventListener('change', (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const parentElement = selectedOption.parentElement;

    if (parentElement.tagName !== 'OPTGROUP') {
        formularioAlimento['nome-outro'].hidden = false;
        formularioAlimento['nome-outro'].focus();
        formularioAlimento['nome-outro'].required = true;
    } else {
        resetNomeOutro();
        formularioAlimento.categoria.value = parentElement.dataset.value;
    }
});


formularioAlimento.addEventListener('submit', (event) => {
    event.preventDefault();

    const dadosFormulario = new FormData(formularioAlimento);
    const alimentoAtualizado = Object.fromEntries(dadosFormulario.entries());

    if (alimentoAtualizado['nome-outro']) {
        alimentoAtualizado.nome = alimentoAtualizado['nome-outro'];
    }

    delete alimentoAtualizado['nome-outro'];

    if (idAlimento !== null) {
        listaAlimentos[idAlimento] = alimentoAtualizado;
    } else {
        listaAlimentos.push(alimentoAtualizado);
        idAlimento = null;
    }

    carregarLinhasTabelaAlimentos();
    formularioAlimento.reset();
});

formularioAlimento.addEventListener('reset', () => {
    idAlimento = null;
    resetNomeOutro();
});

formularioDoacao.addEventListener('submit', (event) => {
    event.preventDefault();
    const dadosDoacao = new FormData(formularioDoacao);
    const doacaoAtualizada = Object.fromEntries(dadosDoacao.entries());
    doacaoAtualizada.listaAlimentos = listaAlimentos;
    [doacaoAtualizada.unidades, doacaoAtualizada.peso] = calcularSomaUnidadesEPesoTotal(listaAlimentos);
    doacaoAtualizada.idUsuario = sessao.id;

    if (idDoacao) {
        listaDoacoes[idDoacao] = doacaoAtualizada;
    } else {
        doacaoAtualizada.id = listaDoacoes.length;
        listaDoacoes.push(doacaoAtualizada);
    }

    localStorage.setItem("listaDoacoes", JSON.stringify(listaDoacoes));

    window.location.assign('../home/doador.html')
})
