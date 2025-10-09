function validarSessao(){
    return !!localStorage.getItem("sessao"); //tenta ler no localStorage a key sessao, se não existe, retorna null. !! retorna boleano
} //função retorna true se existir algo salvo em sessao, false caso contrario

if (!validarSessao()) { //if validarSessao() for false (nao tem sessao), entra no bloco
    window.location.assign('../index.html'); //manda pro index.html (assign muda a url)
}

var categorias = [ //array de objetos, representa as categorias e os itens dentro de cada categoria // <option>
    {
        value: "graos-cereais", //"id" da categoria
        name: "Grãos e Cereais", // texto exibido
        items: { //par de key: valor
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


function opcaoValida(selectElement, optionToCheck) {  //cria um array com todas as options que estão dentro do select e usa o .some
    return Array.from(selectElement.options).some(option => option.value === optionToCheck) //.some retorna verdadeiro se em algum dos elementos do array a função que tá em parênteses for verdadeira
} //a função checa se o value do option é igual ao optionToCheck que eu passo pra opcaoValida

var formularioAlimento = document.getElementById('formulario-alimento'); // armazena na variável o <form>
var idAlimento = new URLSearchParams(window.location.search).get('id'); //pega o valor do parâmetro id ou null se não existir. p entender se o formulário foi aberto p editar um item(tem id) ou para criar (id ausente)
var dbAlimento = JSON.parse(localStorage.getItem("dbAlimento")) || []; //pega o dbAlimento(em string) e transforma para objeto, se dbAlimento estiver null ou undefined, retorna um array vazio
carregarOpcoes(); //Chama a função que monta o html das opções do <select>

if (idAlimento && dbAlimento[idAlimento]) { //Existe um idAlimento vindo da url? e existe um alimento em dbAlimento naquele índice? entra para preencher os campos
    const alimento = dbAlimento[idAlimento]; //Recupera o objeto alimento que será editado.
    for (let key in alimento) { //loop que passa por cada key do objeto alimento  (nome, categoria, peso, quantidade)
        if (formularioAlimento[key]) {
            if (key === 'nome' && !opcaoValida(formularioAlimento['nome'], alimento['nome'])) { //para atualizar o outro //alimentoNome: salvo no localStorage //FormularioAlimentoNome: referencia para o select --> Executa SE a chave atual for nome e SE o nome do alimento salvo no localStorage NÃO for uma das opções válidas no menu
                formularioAlimento['nome'].value = 'outro'; //define a opção outro
                formularioAlimento['nome-outro'].value = alimento['nome']; //preenche o campo livre com o nome
                formularioAlimento['nome-outro'].hidden = false; //deixa o input visivel
            } else { //se nao for o nome especial, só atribui o valor da propriedade ao campo correspondente
                formularioAlimento[key].value = alimento[key];
            }
        }
    }
}

formularioAlimento.nome.addEventListener('change', (event) => { //adiciona um listener ao select nome, ao mudar a opção chama a função
    const selectedOption = event.target.options[event.target.selectedIndex]; //selectedIndex é o índice da opção selecionada, pega a <option> correspondente
    const parentElement = selectedOption.parentElement; //quando a option está dentro de um <optgroup>, parentElement  é o <optgroup>

    if (parentElement.tagName !== 'OPTGROUP') { //Testa se a option não está em um optgroup
        formularioAlimento['nome-outro'].hidden = false;
        formularioAlimento['nome-outro'].focus();
        //Se for opção fora de optgroup, mostra o input nome-outro e dá foco
    } else {
        //Se a escolha foi feita dentro de um optgroup, esconde o nome-outro e limpa ele
        formularioAlimento['nome-outro'].hidden = true;
        formularioAlimento['nome-outro'].value = '';
        formularioAlimento.categoria.value = parentElement.dataset.value; //quando selecionar um alimento, a categoria do form é atualizada automaticamente para a categoria correspondente
    }
});

formularioAlimento.addEventListener('submit', (event) => { //listner para o submit (executa quando clica em salvar)
    event.preventDefault(); //evita o comportamento padrao de recarregar e enviar pro servidor

    const dadosFormulario = new FormData(formularioAlimento); //form data pra transformar todos os inputs do formulário em um json de uma vez
    const alimentoAtualizado = Object.fromEntries(dadosFormulario.entries()); //retorna iterador de pares nome valor, e transforma em pares de um objeto

    if (alimentoAtualizado['nome-outro']) { //Se o usuario preencheu nome-outro, essa propriedade existe no objeto
        alimentoAtualizado.nome = alimentoAtualizado['nome-outro']; //copia o valor de nome-outro para a propriedade nome
    }

    delete alimentoAtualizado['nome-outro']; //remove a chave nome-outro do objeto final

    if (idAlimento !== null) {
        //ve se a pagina foi aberta com ?id, idAlimento é null quando n tem parâmetro id // Decide se vai atualizar (idAlimento !== null) ou criar novo
        dbAlimento[idAlimento] = alimentoAtualizado;
    } else {
        //se não (novo registro), adiciona o objeto ao final do array
        dbAlimento.push(alimentoAtualizado);
    }

    localStorage.setItem("dbAlimento", JSON.stringify(dbAlimento)); //envia o array atualizado para o localstorage em string

    window.location.assign('index.html'); //volta para o index (onde a tabela vai estar atualizada)
});

function carregarOpcoes() { //carregar todas as opções que aparecem nos <select>
    let alimentoHtml = '<option value="" disabled selected>-- Selecione --</option>'; //começa guardando o texto inicial que aparece
    let categoriaHtml = '<option value="" disabled selected>-- Selecione --</option>'; //disabled não permite que seja selecionada e selected é opção padrao
    categorias.forEach(categoria => { //percorre cada categoria da lista
        categoriaHtml += `<option value="${categoria.value}">${categoria.name}</option>`; //adiciona uma nova linha de HTML dentro da variável. adicionado ao select
        alimentoHtml += `<optgroup label="${categoria.name}" data-value="${categoria.value}">`; //cria um grupo de opções dentro do <select> de alimentos
        for (const [itemId, itemName] of Object.entries(categoria.items)) { //loop dentro de cada categoria //categoria.items é o objeto //object.entries transforma o objeto  em uma lista de pares (chave, valor). Item id é a chave, itemName é o Value
            alimentoHtml += `<option value="${itemId}">${itemName}</option>`; //
        }
        alimentoHtml += '</optgroup>';
    })
    alimentoHtml += '<option value="outro">Outro</option>'; //adiciona a opção outro nos  dois selects
    categoriaHtml += '<option value="outro">Outro</option>';

    //inserem o html dentro dos elementos <select>
    formularioAlimento.nome.innerHTML = alimentoHtml;
    formularioAlimento.categoria.innerHTML = categoriaHtml;
}