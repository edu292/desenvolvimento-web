document.addEventListener("DOMContentLoaded", function(){
    
    // 1. CORREÇÃO: O ID do formulário está errado no HTML que você forneceu anteriormente. 
    // O ID correto era 'formEscolha' (com 's'), não 'formEcolha'.
    const form = document.getElementById("formEscolha"); 

    if(form){
        form.addEventListener('submit', function(event){
            event.preventDefault();
            
            const radioSelecionado = document.querySelector('input[name="tipo_usuario"]:checked');
            let tipoUsuario; // Variável declarada, mas ainda sem valor.

            if (radioSelecionado){
                
                // 2. CORREÇÃO CRÍTICA: Você precisa atribuir o valor do rádio à variável!
                tipoUsuario = radioSelecionado.value; 

                // Agora, sim, o console.log vai funcionar e o redirecionamento também.
                console.log("Opção selecionada: " + tipoUsuario); 

                if (tipoUsuario === 'transportador') {
                    window.location.href = '../cadastro/cadastro_transportador.html';
                } else if (tipoUsuario === 'receptor') {
                    window.location.href = '../cadastro/cadastro_receptor.html';
                } else if (tipoUsuario === 'doador') {
                    window.location.href = '../cadastro/cadastro_doador.html';
                }
            } else {
                alert("Por favor, selecione um tipo de conta para prosseguir");
            }
        });
    } else {
        // Se este erro aparecer no console, o problema é que o ID do formulário no HTML não é 'formEscolha'.
        console.error("Formulário não encontrado! Verifique se o ID 'formEscolha' está correto no HTML.");
    }
});