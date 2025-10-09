document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards');
    const addCardButton = document.getElementById('botao-enviar');


    let cardCount = 0;

    function addCard() {

        cardCount++;
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <h3>Card</h3>
            <p>Este card foi adicionado dinamicamente via JavaScript.</p>
        `;
        const rejeitar_pedido = document.createElement("button")
        rejeitar_pedido.classList.add('rejeitar_pedido');
        rejeitar_pedido.innerHTML = '&times;';
        rejeitar_pedido.addEventListener('click', function(){
            this.parentElement.remove()
        })
        cardsContainer.appendChild(newCard);
        newCard.appendChild(rejeitar_pedido)
    }

    addCardButton.addEventListener('click', addCard);
    addCard()
    addCard()
});
