# Em construção 🚧

# API para locadora de filmes com TypeORM

### Tecnologias utilizadas;

- Node.JS
- Express.JS
- Express-async-errors
- Typescript
- Zod
- Pg
- typeORM
- PostgreSQL

# Endpoints

| Método | Endpoint    | Responsabilidade                  |
| ------ | ----------- | --------------------------------- |
| POST   | /movies     | Cadastra um novo filme            |
| GET    | /movies     | Lista todos os filmes cadastrados |
| PATCH  | /movies/:id | Atualiza o filme passado por id   |
| DELETE | /movies/:id | Deleta o filme passado por id     |

# Regras da Aplicação

- A tabela de **_movies_** contém os seguintes dados:

  - **id**: inteiro, sequencial e chave primária.
  - **name**: string, tamanho máximo de 50, único e obrigatório.
  - **description**: texto.
  - **duration**: inteiro e obrigatório.
  - **price**: inteiro e obrigatório.

## **Regras de Paginação**

A rota **GET /movies** contém paginação.

- Essa rota recebe quatro query params, sendo eles: **_page_**, **_perPage_**, **_order_** e **_sort_**.
- Essa rota retornará um objeto de paginação que irá conter as seguintes chaves: **prevPage**, **nextPage**, **count** e **data**.

Segue abaixo o que cada chave significa e a regra de cada um dos query params.

### **Query params: order e sort**

- **sort**:

  - **_price_**
  - **_duration_**
    - Caso **_nenhum_** desses valores seja enviado, deve ordenar por **_id_**.

- **order**: recebe qual o **_tipo_** de ordenação que será feita. Pode receber apenas dois valores:
  - **asc**
  - **desc**
  - Caso **_nenhum_** desses valores seja enviado, deve utilizar **_asc_**.
  - O **_tipo_** de ordenação só funciona caso **sort seja enviado**:
    - caso não seja enviado, o tipo deve ser **_asc_**.

### **Query params: perPage e page**

- **perPage**: recebe qual a **_quantidade_** de dados que devem ser **retornados**.
  - Caso o número enviado seja **_maior que cinco_**, retornará **_retornar cinco dados_**.
- **page**: recebe qual **_página_** deve ser **_retornada_**.

## **Exemplos de Requisição**

### **Casos de Erro:**

- O **nome** é **único**. Nas rotas **POST e PATCH /movies**, caso seja enviado um nome já registrado, retorna mensagem de erro e o status code mencionados abaixo.

  | Resposta do servidor:                                 |
  | ----------------------------------------------------- |
  | Body: Formato Json                                    |
  | Status code: <b style="color:orange">409 CONFLICT</b> |

  ```json
  {
    "message": "Movie already exists."
  }
  ```

- Deve verificar se o **_id informado existe_**. Caso o filme (movie) não exista, retorna mensagem de erro e o status code mencionados abaixo.

  | Resposta do servidor:                                  |
  | ------------------------------------------------------ |
  | Body: Formato Json                                     |
  | Status code: <b style="color:orange">404 NOT FOUND</b> |

  ```json
  {
    "message": "Movie not found"
  }
  ```

### **Casos de sucesso**

### **POST - /movies**

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
  "id": 40,
  "duration": 60,
  "name": "Movie: Sem description",
  "price": 200
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
{
  "id": 1,
  "name": "Movie: Sem description",
  "description": null,
  "duration": 60,
  "price": 200
}
```

### **GET - /movies**

**Url da requisição**: `http://localhost:3000/movies/?sort=price&order=desc&page=2&perPage=3`

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  "prevPage": "http://localhost:3000/movies?page=1&perPage=3",
  "nextPage": "http://localhost:3000/movies?page=3&perPage=3",
  "count": 14,
  "data": [
    {
      "id": 8,
      "name": "Filme 08",
      "description": null,
      "duration": 88,
      "price": 72
    },
    {
      "id": 4,
      "name": "Filme 04",
      "description": null,
      "duration": 75,
      "price": 72
    },
    {
      "id": 11,
      "name": "Filme 11",
      "description": null,
      "duration": 7,
      "price": 68
    }
  ]
}
```

### **PATCH - /movies/:id**

**Url da requisição**: `http://localhost:3000/movies/4`

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
  "id": 55,
  "duration": 130,
  "price": 200
}
```

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  "id": 4,
  "name": "Filme 04",
  "description": null,
  "duration": 130,
  "price": 200
}
```

### **DELETE - /movies/:id**

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: **Nenhum body deve ser retornado**               |
| Status code: <b style="color:green">204 NO CONTENT</b> |

```json

```
