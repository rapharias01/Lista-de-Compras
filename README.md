# Controle de Compras

O **Controle de Compras** é um aplicativo simples que permite ao usuário gerenciar uma lista de compras, adicionar produtos à lista, marcar a quantidade comprada e enviar a lista de compras para uma API de compras.

## Funcionalidades

O aplicativo oferece as seguintes funcionalidades:

### Adicionar produtos à lista de compras

1. Preencha os campos obrigatórios: nome, unidade e quantidade necessária.
2. Clique no botão "Salvar" para adicionar o produto à lista.
3. A lista de produtos será exibida na tabela abaixo.

### Marcar a quantidade de produtos comprada

- Após adicionar um produto, insira a quantidade comprada na coluna "Quantidade Comprada" e pressione Enter.
- O checkbox ao lado será marcado automaticamente se a quantidade comprada for igual ou maior que a quantidade necessária.
- A tabela indicará visualmente se o produto foi coletado, alterando a cor de fundo.

### Editar um produto

- Para editar um produto, clique no botão "Editar" na linha correspondente do produto na tabela.
- Os campos de entrada de dados serão preenchidos com as informações do produto selecionado.
- Faça as alterações necessárias e clique em "Salvar" para atualizar o produto na lista.

### Excluir um produto

- Para excluir um produto da lista, clique no ícone de lixeira na linha correspondente do produto na tabela.
- O produto será removido da lista.
- Para excluir a lista por completo, basta clicar no botão de excluir na página de cadastro. Uma confirmação será exibida para evitar exclusões acidentais.

### Enviar a lista de compras

- Antes de enviar a lista, verifique se todos os produtos foram coletados (todos os checkboxes marcados).
- Clique no botão "Enviar" para enviar a lista de compras para a API.
- A lista de compras e seus produtos serão enviados para o servidor.

## Tecnologias Utilizadas

O Controle de Compras utiliza as seguintes tecnologias:

- JavaScript
- HTML
- CSS
- Fetch API para comunicação com a API de compras
- Bootstrap

Este aplicativo oferece uma maneira fácil e conveniente de gerenciar suas compras, garantindo que você tenha tudo o que precisa e possa compartilhar sua lista com outros usuários ou sistemas através da API de compras.
