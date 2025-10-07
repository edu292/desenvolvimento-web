function validarSessao(){
    return !!localStorage.getItem("sessao");
}

if (!validarSessao()) {
    window.location.assign('../index.html');
}


const tempAlimento = {
    Alimento: "Feijão",
    Categoria: "Perecível",
    Descrição: "Pacote de feijão 1kg",
    Restrição: "Contém glúten",
    Validade: "22/02/2026",
    Armazenamento: "Local arejado e seco"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_alimento')) ?? []
const setLocalStorage = (db_alimento) => localStorage.setItem("db_alimento", JSON.stringify (db_alimento))

const deleteAlimento = (index) => {
    const db_alimento = readAlimento()
    db_alimento.splice(index,1)
    setLocalStorage(db_alimento)
}

const updateAlimento = (index, alimento) => {
    const db_alimento = readAlimento()
    db_alimento[index] = alimento
    setLocalStorage(db_alimento)
}

const readAlimento = () => getLocalStorage()

const createAlimento = (alimento) => {
    const db_alimento = getLocalStorage()
    db_alimento.push (alimento)
    setLocalStorage(db_alimento)
}