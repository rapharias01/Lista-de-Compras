class Produto {
    constructor() {
        this.codigo = null;
        this.nome = null;
        this.unidade = null;
        this.quantidade = null;
        this.codBarra = null;
        this.coletado = false;
    }
}

const controladorProduto = {
    listaProduto: [],

    getListaProduto() {
        const str = window.localStorage.getItem('listaProduto');
        if (str) {
            this.listaProduto = JSON.parse(str);
        } else {
            this.listaProduto = [];
        }
        return this.listaProduto;
    },

    getProduto(codigo) {
        return this.getListaProduto().find((u) => u.codigo == codigo);
    },

    salvarListaProduto() {
        const strLista = JSON.stringify(this.listaProduto);
        window.localStorage.setItem('listaProduto', strLista);
    },

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

    excluir(codigo) {
        const index = this.listaProduto.findIndex((u) => u.codigo === codigo);
        if (index > -1) {
            this.listaProduto.splice(index, 1);
        }
        this.salvarListaProduto();
    },

    excluirProd(codigo) {
        const index = this.listaProduto.findIndex((u) => u.codigo === codigo);
        if (index > -1) {
            this.listaProduto.splice(index, 1);
            this.salvarListaProduto();
            carregarLista();
        }
    },

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

    excluirLista() {
        this.listaProduto = [];
        this.salvarListaProduto();
    },
};