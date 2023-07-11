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
//Limpa os campos de entrada de dados para adicionar um novo produto
function novo() {
    const codigo = document.getElementById('codigo');
    const nome = document.getElementById('nome');
    const unidade = document.getElementById('unidade');
    const quantidade = document.getElementById('quantidade');
    const codBarra = document.getElementById('codBarra');
    codigo.value = '';
    nome.value = '';
    unidade.value = '';
    quantidade.value = '';
    codBarra.value = '';
}
//Verifica se os campos obrigatórios estão preenchidos.
function verificarCamposObrigatorios() {
    const nome = document.getElementById('nome').value;
    const unidade = document.getElementById('unidade').value;
    const quantidade = document.getElementById('quantidade').value;

    if (!nome || !unidade || !quantidade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    return true;
}
//Salva ou atualiza um produto na lista de produtos.
function salvar() {
    if (!verificarCamposObrigatorios()) {
        return;
    }

    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const unidade = document.getElementById('unidade').value;
    const quantidade = document.getElementById('quantidade').value;
    const codBarra = document.getElementById('codBarra').value;

    let produto;

    if (codigo !== '') {
        produto = controladorProduto.getProduto(codigo);
        if (produto) {
            produto.nome = nome;
            produto.unidade = unidade;
            produto.quantidade = quantidade;
            produto.codBarra = codBarra;
        }
    } else {
        produto = new Produto();
        produto.nome = nome;
        produto.unidade = unidade;
        produto.quantidade = quantidade;
        produto.codBarra = codBarra;
    }

    controladorProduto.salvar(produto);

    carregarLista();
    novo();
    salvarListaCompras();
}
// Preenche os campos de entrada de dados com as informações de um produto para permitir a edição.
function editar(codigo) {
    // Redireciona para a página de cadastro passando o código do produto como parâmetro na URL
    window.location.href = `Cadastro.html?codigo=${codigo}`;
}
//exclui os produtos da lista
function excluir() {
    const c = document.getElementById('codigo');
    controladorProduto.excluir(c.value);
    carregarLista();
    novo();
    salvarListaCompras();
}
//Verifica a quantidade de um produto e atualiza seu estado de coleta.
function verificarQuantidade(codigo) {
    const produto = controladorProduto.getProduto(codigo);
    const tdQuantidade = document.getElementById(`tdQuantidade_${codigo}`);
    const tdCheckbox = document.getElementById(`tdCheckbox_${codigo}`);

    if (produto && tdQuantidade && tdCheckbox) {
        const quantidadeComprada = parseInt(tdQuantidade.value);
        const quantidadeNecessaria = parseInt(produto.quantidade);

        tdCheckbox.checked = quantidadeComprada >= quantidadeNecessaria;

        produto.coletado = quantidadeComprada >= quantidadeNecessaria;
        salvarListaCompras();

        if (quantidadeComprada >= quantidadeNecessaria) {
            tdQuantidade.parentNode.parentNode.classList.add('coletado');
        } else {
            tdQuantidade.parentNode.parentNode.classList.remove('coletado');
        }

        verificarTodosColetados(); // Verifica se todos os produtos estão coletados para habilitar o botão "Enviar"
    }
}
//Carrega a lista de produtos e exibe na tabela.
function carregarLista() {
    const bodyLista = document.getElementById('bodyLista');
    const lista = controladorProduto.getListaProduto();
    let linhas = '';
  
    lista.forEach((produto) => {
      const { codigo, nome, unidade, quantidade, coletado } = produto;
      const tdQuantidadeId = `tdQuantidade_${codigo}`;
      const tdCheckboxId = `tdCheckbox_${codigo}`;
      const coletadoChecked = coletado ? 'checked' : '';
  
      linhas += `<tr>
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${unidade}</td>
        <td>${quantidade}</td>
        <td><input class="col-3" type="number" id="${tdQuantidadeId}" onchange="verificarQuantidade(${codigo})"></td>
        <td><input type="checkbox" id="${tdCheckboxId}" onchange="marcarColetado(${codigo})" disabled ${coletadoChecked}></td>
        <td><button class="btn btn-outline-success" onclick="editar(${codigo})">editar</button></td>
      </tr>`;
    });
  
    bodyLista.innerHTML = linhas;
  
    verificarTodosColetados();
    controladorProduto.verificarTodosMarcados();
  }
//Salva a lista de produtos no armazenamento local.
function salvarListaCompras() {
    const listaCompras = controladorProduto.getListaProduto();
    const strListaCompras = JSON.stringify(listaCompras);
    window.localStorage.setItem('listaCompras', strListaCompras);
}
//Marca um produto como coletado ou não.
function marcarColetado(codigo) {
    const produto = controladorProduto.getProduto(codigo);
    const tdCheckbox = document.getElementById(`tdCheckbox_${codigo}`);
  
    if (produto && tdCheckbox) {
      produto.coletado = tdCheckbox.checked;
      localStorage.setItem('listaCompras', JSON.stringify(controladorProduto.getListaProduto()));
    }
    verificarTodosColetados();
  }
//Verifica se todos os produtos estão coletados e habilita/desabilita o botão "Enviar".
function verificarTodosColetados() {
    const lista = controladorProduto.getListaProduto();
    const todosColetados = lista.every(produto => produto.coletado);

    const btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.disabled = !todosColetados; // Desabilita o botão se nem todos os produtos estiverem coletados

    controladorProduto.verificarTodosMarcados();
}
//Link da API
const LINK_COMPRAS = "https://6492fc6f428c3d2035d10f08.mockapi.io/Compras";
const LINK_PRODUTOS = "https://6492fc6f428c3d2035d10f08.mockapi.io/Compras/1/produto";
//Envia a lista de produtos coletados para uma API de compras.
function enviar() {
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
