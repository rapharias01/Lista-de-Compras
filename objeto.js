/**
 * Classe Produto representa um item de produto com informações básicas.
 * @class
 */
class Produto {
    constructor() {
        this.codigo = null;     // O código do produto.
        this.nome = null;       // O nome do produto.
        this.unidade = null;    // A unidade de medida do produto.
        this.quantidade = null; // A quantidade do produto disponível.
        this.codBarra = null;   // O código de barras do produto.
    }
}

/**
 * Objeto controladorProduto gerencia a lista de produtos e suas operações.
 * @type {Object}
 */
const controladorProduto = {
    listaProduto: [],

    /**
     * Obtém a lista de produtos armazenada no local storage.
     * @returns {Array<Produto>} A lista de produtos.
     */
    getListaProduto() {
        const str = window.localStorage.getItem('listaProduto');
        if (str) {
            this.listaProduto = JSON.parse(str);
        } else {
            this.listaProduto = [];
        }
        return this.listaProduto;
    },

    /**
     * Retorna o produto com o código especificado.
     * @param {number} codigo - O código do produto a ser encontrado.
     * @returns {Produto|undefined} O produto encontrado ou undefined se não for encontrado.
     */
    getProduto(codigo) {
        return this.getListaProduto().find((u) => u.codigo == codigo);
    },

    /**
     * Salva a lista de produtos no local storage.
     */
    salvarListaProduto() {
        const strLista = JSON.stringify(this.listaProduto);
        window.localStorage.setItem('listaProduto', strLista);
    },

    /**
     * Salva um produto na lista. Se o produto já existir na lista, atualiza-o; caso contrário, adiciona-o.
     * @param {Produto} produto - O produto a ser salvo ou atualizado.
     */
    salvar(produto) {
        this.getListaProduto();
        if (produto.codigo !== null && produto.codigo > 0) {
            const index = this.listaProduto.findIndex((u) => u.codigo === produto.codigo);
            if (index > -1) {
                this.listaProduto.splice(index, 1, produto);
            }
        } else {
            produto.codigo = this.listaProduto.length + 1;
            this.listaProduto.push(produto);
        }

        this.salvarListaProduto();
    },

    /**
     * Exclui um produto da lista com base no seu código.
     * @param {number} codigo - O código do produto a ser excluído.
     */
    excluir(codigo) {
        const index = this.listaProduto.findIndex((u) => u.codigo === codigo);
        if (index > -1) {
            this.listaProduto.splice(index, 1);
        }
        this.salvarListaProduto();
    },

    /**
     * Exclui um produto da lista com base no seu código e carrega novamente a lista atualizada.
     * @param {number} codigo - O código do produto a ser excluído.
     */
    excluirProd(codigo) {
        const index = this.listaProduto.findIndex((u) => u.codigo === codigo);
        if (index > -1) {
            this.listaProduto.splice(index, 1);
            this.salvarListaProduto();
            carregarLista();
        }
    },

    /**
     * Verifica se todos os checkboxes estão marcados e habilita o botão 'Enviar' em conformidade.
     */
    verificarTodosMarcados() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let todasMarcadas = true;

        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                todasMarcadas = false;
                return;
            }
        });

        const btnEnviar = document.getElementById('btnEnviar');
        btnEnviar.disabled = !todasMarcadas;
    },

    /**
     * Exclui todos os produtos da lista e atualiza o local storage.
     */
    excluirLista() {
        this.listaProduto = [];
        this.salvarListaProduto();
    },
};
