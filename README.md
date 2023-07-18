## Controle de Compras
O Controle de Compras é um aplicativo simples que permite ao usuário gerenciar uma lista de compras, adicionar produtos à lista, marcar a quantidade comprada e enviar a lista de compras para uma API de compras.

## Funcionalidades
Adicionar produtos à lista de compras informando nome, unidade e quantidade necessária.
Marcar a quantidade de produtos comprada.
Editar produtos na lista de compras.
Excluir produtos da lista de compras.
Enviar a lista de compras para uma API de compras.
Verificar se todos os produtos foram coletados antes de enviar a lista.
Limpar a lista de compras após o envio bem-sucedido.

## Como usar

# Adicione um produto à lista:
Preencha os campos obrigatórios: nome, unidade e quantidade necessária.
Clique no botão "Salvar" para adicionar o produto à lista.
A lista de produtos será exibida na tabela abaixo.
Marcar a quantidade comprada:

Após adicionar um produto, insira a quantidade comprada na coluna "Quantidade Comprada" e pressione Enter.
O checkbox ao lado será marcado automaticamente se a quantidade comprada for igual ou maior que a quantidade necessária.
A tabela indicará visualmente se o produto foi coletado, alterando a cor de fundo.

# Editar um produto:
Para editar um produto, clique no botão "Editar" na linha correspondente do produto na tabela.
Os campos de entrada de dados serão preenchidos com as informações do produto selecionado.
Faça as alterações necessárias e clique em "Salvar" para atualizar o produto na lista.


# Excluir um produto:
Para excluir um produto da lista, clique no icone de lixeira na linha correspondente do produto na tabela.
O produto será removido da lista.
Para exlcuir a lista por completo basta clicar no botão de excluir na pagina de cadastro 
aparecerá uma confirmacao para que o usuário não exclua por engano 


# Enviar a lista de compras:

Antes de enviar a lista, verifique se todos os produtos foram coletados (todos os checkboxes marcados).
Clique no botão "Enviar" para enviar a lista de compras para a API.
A lista de compras e seus produtos serão enviados para o servidor.

# Tecnologias utilizadas
JavaScript
HTML
CSS
Fetch API para comunicação com a API de compras
Bootstrap