/**
 * Link da API de compras.
 * @type {string}
 */
const LINK_COMPRAS = "https://64b6d399df0839c97e162db2.mockapi.io/Compras";
/**
 * Link da API de produtos.
 * @type {string}
 */
const LINK_PRODUTOS = "https://64b6d399df0839c97e162db2.mockapi.io/Compras/1/Produtos";
/**
 * Envia a lista de produtos coletados para uma API de compras.
 */
function enviar() {
    // Exibe um aviso para confirmar o envio da lista de compras para a API
    confirmSend = window.confirm("Você está prestes a enviar a lista para API. deseja continuar?");
    if (confirmSend) {
        // Obter a lista de produtos da compra
        const listaProdutos = controladorProduto.getListaProduto();
        const compra = {
            id: listaProdutos.length,
            Date: new Date().toISOString(), // Obtém a data atual do sistema
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