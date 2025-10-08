function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}

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

const formularioAlimento = document.getElementById('formulario-alimento');
const idAlimento = new URLSearchParams(window.location.search).get('id');
const dbAlimento = JSON.parse(localStorage.getItem("dbAlimento")) || [];
carregarOpcoes();

if (idAlimento && dbAlimento[idAlimento]) {
    const alimento = dbAlimento[idAlimento];
    for (let key in alimento) {
        if (formularioAlimento[key]) {
            if (key === 'nome') {
                const selectElement = formularioAlimento[key];
                if (!Array.from(selectElement.options).some(option => option.text === alimento[key])) {
                    formularioAlimento['nome'].value = 'outro';
                    formularioAlimento['nome-outro'].value = alimento['nome'];
                    formularioAlimento['nome-outro'].hidden = false;
                }
            } else {
                formularioAlimento[key].value = alimento[key];
            }
        }
    }
}

formularioAlimento.nome.addEventListener('change', (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const parentElement = selectedOption.parentElement;

    if (parentElement.tagName !== 'OPTGROUP') {
        formularioAlimento['nome-outro'].hidden = false;
        formularioAlimento['nome-outro'].focus();
    } else {
        formularioAlimento['nome-outro'].hidden = true;
        formularioAlimento['nome-outro'].value = '';
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
        dbAlimento[idAlimento] = alimentoAtualizado;
    } else {
        dbAlimento.push(alimentoAtualizado);
    }

    localStorage.setItem("dbAlimento", JSON.stringify(dbAlimento));

    window.location.assign('index.html');
});

function carregarOpcoes() {
    let alimentoHtml = '<option value="" disabled selected>-- Selecione --</option>';
    let categoriaHtml = '<option value="" disabled selected>-- Selecione --</option>';
    categorias.forEach(categoria => {
        categoriaHtml += `<option value="${categoria.value}">${categoria.name}</option>`;
        alimentoHtml += `<optgroup label="${categoria.name}" data-value="${categoria.value}">`;
        for (const [itemId, itemName] of Object.entries(categoria.items)) {
            alimentoHtml += `<option value="${itemId}">${itemName}</option>`;
        }
        alimentoHtml += '</optgroup>';
    })
    alimentoHtml += '<option value="outro">Outro</option>';
    categoriaHtml += '<option value="outro">Outro</option>';

    formularioAlimento.nome.innerHTML = alimentoHtml;
    formularioAlimento.categoria.innerHTML = categoriaHtml;
}