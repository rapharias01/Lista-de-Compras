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
    confirmDelete = window.confirm("essa ação vai excluir a lista de compras por completo");
    if(confirmDelete){
        const c = document.getElementById('codigo');
    controladorProduto.excluir(c.value);
    carregarLista();
    novo();
    salvarListaCompras();
    }    
}

function excluirProd(codigo) {
    controladorProduto.excluir(codigo);
    carregarLista();
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
            <td><input type="checkbox" style="cursor:default;" id="${tdCheckboxId}" onchange="marcarColetado(${codigo})" disabled ${coletadoChecked}></td>
            <td>
                <button class="btn" style="width:1px;" onclick="editar(${codigo})"><i class="bi bi-pencil"></i></button>
                <button class="btn" style="width:1px;" onclick="excluirProd(${codigo})"><i class="bi bi-trash"></i></button>
            </td>
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