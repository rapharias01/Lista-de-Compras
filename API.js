//Link da API
const LINK_COMPRAS = "https://6492fc6f428c3d2035d10f08.mockapi.io/Compras";
const LINK_PRODUTOS = "https://6492fc6f428c3d2035d10f08.mockapi.io/Compras/1/produto";
//Envia a lista de produtos coletados para uma API de compras.
function enviar() {

    confirmSend = window.confirm("Você está prestes a enviar a lista para API. deseja continuar?");
    if (confirmSend) {
        // Obter a lista de produtos da compra
        const listaProdutos = controladorProduto.getListaProduto();
        const compra = {
            CodCompras: listaProdutos.length,
            Data: new Date().toISOString(), // Obtém a data atual do sistema
        };

        // Enviar a compra para o endpoint de compras
        fetch(LINK_COMPRAS, {
            method: 'POST',
            body: JSON.stringify(compra),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // Se a compra for enviada com sucesso, enviar os produtos para o endpoint correspondente
                    return fetch(LINK_PRODUTOS, {
                        method: 'POST',
                        body: JSON.stringify(listaProdutos),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    throw new Error('Falha ao enviar a compra');
                }
            })
            .then(response => {
                if (response.ok) {
                    // Os produtos foram enviados com sucesso
                    console.log('Compra e produtos enviados com sucesso!');
                    controladorProduto.excluirLista(); // Limpar as informações da lista de compra
                    carregarLista();
                } else {
                    throw new Error('Falha ao enviar os produtos');
                }
            })
            .catch(error => {
                console.log('Erro:', error);
            });
    }
}