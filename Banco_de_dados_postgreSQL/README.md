# API - Movies

#### Projeto (Back-End) de uma API REST para filmes.

### Tecnologias utilizadas;

- Node.JS
- Express.JS
- Typescript
- pg
- pg-format
- postgreSQL

### Tabela

| Coluna      | Especificações                                       |
| ----------- | ---------------------------------------------------- |
| id          | inteiro, auto incrementável e chave primária         |
| name        | string, tamanho máximo 50, única e chave obrigatória |
| description | texto                                                |
| duration    | inteiro e chave obrigatória                          |
| price       | inteiro (>0) e chave obrigatória                     |

### Endpoints do serviço:

| POST            | movies                      |
| --------------- | --------------------------- |
| Criar um movie: |                             |
| Sucesso:        | Objeto Movie - 201 CREATED. |
| Nome existente  | Objeto Erro - 409 CONFLICT. |

| DELETE            | movies                        |
| ----------------- | ----------------------------- |
| Deletar um movie: |                               |
| Sucesso:          | Sem retorno - 204 NO CONTENT. |
| Não encontrado    | Objeto Erro - 404 NOT FOUND.  |

| GET                     | movies                        |
| ----------------------- | ----------------------------- |
| Listar todos os movies: |                               |
| Sucesso:                | Objeto de paginação - 200 OK. |

| PATCH                           | movies                            |
| ------------------------------- | --------------------------------- |
| Atualizar os dados de um movie: |                                   |
| Sucesso:                        | Objeto Movie atualizado - 200 OK. |
| Não encontrado:                 | Objeto Erro - 404 NOT FOUND.      |
| Nome existente:                 | Objeto Erro- 409 CONFLICT.        |
