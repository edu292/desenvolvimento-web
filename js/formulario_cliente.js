const formularioCliente = document.getElementById('formulario-cliente');
const idCliente = new URLSearchParams(window.location.search).get('id');
const listaClientes = JSON.parse(localStorage.getItem("listaClientes")) || [];

if (idCliente !== null && listaClientes[idCliente]) {
    const cliente = listaClientes[idCliente];
    for (const key in cliente) {
        if (formularioCliente[key]) {
            formularioCliente[key].value = cliente[key];
        }
    }
}

formularioCliente.addEventListener('submit', (event) => {
    event.preventDefault();

    const dadosFormulario = new FormData(formularioCliente);
    const clienteAtualizado = Object.fromEntries(dadosFormulario.entries());

    if (idCliente !== null) {
        listaClientes[idCliente] = clienteAtualizado;
    } else {
        listaClientes.push(clienteAtualizado);
    }

    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

    window.location.assign('index.html');
});
