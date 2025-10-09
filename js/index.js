const listaCategorias = [
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


const loginForm = document.getElementById('login-form');
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) ?? [{email: 'admin', senha: 'admin123', tipoUsuario: 'admin', id: 0}];

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const sessao = listaUsuarios.find((usuario) => usuario.email === loginForm.email.value && usuario.senha === loginForm.senha.value);

    if (!sessao) {
        loginForm['output-login-invalido'].value = 'Senha ou email inválidos';
        return;
    }

    localStorage.setItem("sessao", JSON.stringify(sessao));
    localStorage.setItem('listaCategorias', JSON.stringify(listaCategorias));
    if (listaUsuarios.length === 1) {
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    }

    if (sessao.tipoUsuario === "doador"){
        window.location.assign("home/doador.html");
    } else if (sessao.tipoUsuario === "receptor"){
        window.location.assign("home/receptor.html");
    } else if(sessao.tipoUsuario === "transportador") {
        window.location.assign("home/transportador.html")
    } else if (sessao.tipoUsuario === "admin") {
        window.location.assign("home/admin.html");
    }
});