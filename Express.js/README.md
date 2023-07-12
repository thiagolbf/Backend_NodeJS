# API - Movies

#### Projeto (Back-End) de uma API REST para lista de compras.

### Tecnologias utilizadas;

- Node.JS
- Express.JS
- Typescript

### Endpoints do serviço:

## POST /purchaseList

Criar uma nova lista de compras:

- Sucesso: Objeto de lista - `201 CREATED`
- Entrada inválida: Objeto de mensagem - `400 BAD REQUEST`
- Tipo do valor de entrada inválido: Objeto de mensagem - `400 BAD REQUEST`

## GET /purchaseList

Pega todas as listas de compras:

- Sucesso: Array de objetos de lista - `200 OK`

## GET /purchaseList/<purchaseListId>

Pega uma lista de compras específica:

- Sucesso: Objeto de lista - `200 OK`
- Lista não encontrada: Objeto de mensagem - `404 NOT FOUND`

## PATCH /purchaseList/<purchaseListId>/<itemName>

Atualiza os dados de um item da lista:

- Sucesso: Objeto de lista - `200 OK`
- Item não encontrado na lista: Objeto de mensagem - `404 NOT FOUND`
- Lista não encontrada: Objeto de mensagem - `404 NOT FOUND`
- Entrada inválida: Objeto de mensagem - `400 BAD REQUEST`
- Tipo do valor de entrada inválido: Objeto de mensagem - `400 BAD REQUEST`

## DELETE /purchaseList/<purchaseListId>/<itemName>

Deleta um item da lista:

- Sucesso: Nenhum retorno - `204 NO CONTENT`
- Item não encontrado na lista: Objeto de mensagem - `404 NOT FOUND`
- Lista não encontrada: Objeto de mensagem - `404 NOT FOUND`

## DELETE /purchaseList/<purchaseListId>

Deleta uma lista:

- Sucesso: Nenhum retorno - `204 NO CONTENT`
- Lista não encontrada: Objeto de mensagem - `404 NOT FOUND`
