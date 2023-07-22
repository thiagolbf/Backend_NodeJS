# Em construção 🚧

# API para locadora de filmes com TypeORM

# Endpoints

| Método | Endpoint    | Responsabilidade                  |
| ------ | ----------- | --------------------------------- |
| POST   | /movies     | Cadastra um novo filme            |
| GET    | /movies     | Lista todos os filmes cadastrados |
| PATCH  | /movies/:id | Atualiza o filme passado por id   |
| DELETE | /movies/:id | Deleta o filme passado por id     |

# Regras da Aplicação

- Deve ser criado um banco de dados em **_PostgreSQL_** com uma tabela/entidade nomeada como **_movies_**, para armazenar os dados das requisições.

- A tabela de **_movies_** deve ter as colunas necessárias para armazenar os seguintes dados:

  - **id**: inteiro, sequencial e chave primária.
  - **name**: string, tamanho máximo de 50, único e obrigatório.
  - **description**: texto.
  - **duration**: inteiro e obrigatório.
  - **price**: inteiro e obrigatório.

- Como estamos trabalhando com TypeORM, deve ser criada uma entidade de movies com os campos descritos acima, e essa entidade vai ser convertida em tabela através de uma migração.

- O **nome da classe da entidade deve ser Movie** e deve ser criado um arquivo index.ts dentro da pasta de entities centralizando o export dela para que os testes funcionem.

- Nas rotas **POST** e **PATCH**, é necessário serializar os dados de entrada utilizando o zod. Chaves não mapeadas devem ser ignoradas.
- Na rota **POST /movies**, a chave id deve ser ignorada, o próprio serviço deve preencher esse dado. A chave **\_description\_\_** é **_opcional_**, caso não seja enviada deve ser salvo como **_null_**.
- Na rota **PATCH /movies**, a chave id não pode ser atualizada, caso enviada deve ser ignorada.

## **Regras de Paginação**

A rota **GET /movies** deve conter paginação.

- Essa rota recebe quatro query params, sendo eles: **_page_**, **_perPage_**, **_order_** e **_sort_**.
- Essa rota retornará um objeto de paginação que irá conter as seguintes chaves: **prevPage**, **nextPage**, **count** e **data**.

Segue abaixo o que cada chave significa e a regra de cada um dos query params.

### **Query params: order e sort**

- **sort**: recebe em qual **_coluna_** a ordenação deve ser feita. Pode receber apenas dois valores:

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

  - Deve receber apenas **números inteiros e maiores que 0**
  - Caso o número enviado não atenda esses requisitos:
    - deve retornar os **_cinco primeiros dados_**.
  - O valor **_máximo_** à ser retornado deve ser **_cinco_**
    - Caso o número enviado seja **_maior que cinco_**, deve **_retornar cinco dados_**.

- **page**: recebe qual **_página_** deve ser **_retornada_**.
  - Recebe apenas **números inteiros e maiores que 0**
  - Caso o número enviado **_não atenda_** esses requisitos, deve utilizar a **_primeira página_**, ou seja, deve ser **_1_**
  - Deve **_respeitar_** o **_perPage_**:
    - se **_page_** for igual à **_três_** e **_perPage_** for igual à **_dois_**, deve **_retornar dois dados_**, **_começando pelo id cinco_** e indo **_até_** o **_id seis_**.

### **Objeto de paginação**

Deve seguir as regras do page e do perPage.

Um exemplo mais claro estará nos exemplos de requisição da rota GET - /movies

- **prevPage**: página anterior
  - **_tipo_**: string ou null;
  - Caso a próxima página exista, deve retornar uma url redirecionando para a página;
  - Caso contrario deve retornar null;
- **nextPage**: próxima página;
  - **_tipo_**: string ou null;
  - Caso a próxima página exista, deve retornar uma url redirecionando para a página;
  - Caso contrario deve retornar null;
- **count**: contagem de dados existentes no banco de dados;
  - **_tipo_**: number;
- **data**: os filmes listados pela requisição;
  - **_tipo_**: Array de movies;
  - A quantidade de filmes retornados deve seguir as regras do perPage.

## **Exemplos de Requisição**

### **Casos de Erro:**

    Todos os casos de erros listados a seguir, devem ser executados por meio de middlewares.

- O **nome** (name) deve ser **único**. Nas rotas **POST e PATCH /movies**, caso seja enviado um nome já registrado, deve retornar a mensagem de erro e o status code mencionados abaixo.

  | Resposta do servidor:                                 |
  | ----------------------------------------------------- |
  | Body: Formato Json                                    |
  | Status code: <b style="color:orange">409 CONFLICT</b> |

  ```json
  {
    "message": "Movie already exists."
  }
  ```

- A **_serialização_** dos dados de entrada deve ser feita utilizando o **_zod_**. Essa serialização deve acontecer nas rotas **_POST e PATCH_**. Em caso de erro ao validar os dados, deve retornar a mensagem de erro e o status code mencionados abaixo.

  | Resposta do servidor:                                    |
  | -------------------------------------------------------- |
  | Body: Formato Json                                       |
  | Status code: <b style="color:orange">400 BAD REQUEST</b> |

  ```json
  {
    "message": {
      "price": ["Required"],
      "name": ["Expected string, received number"],
      "duration": ["Expected number, received string"]
    }
  }
  ```

- Em **todas as rotas que recebem id por parâmetro**, deve verificar se o **_id informado existe_**. Caso o filme (movie) não exista, deve retornar a mensagem de erro e o status code mencionados abaixo.

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

Rota de criação de filmes. A chave **_description_** é **_opcional_**.

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
// Repare nos valores de ID enviados e retornados⁠
{
  "id": 1,
  "name": "Movie: Sem description",
  "description": null,
  "duration": 60,
  "price": 200
}
```

### **GET - /movies**

Deve ser possível listar os filmes armazenados no banco de dados. **_Seguindo as regras de paginação_**

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

Deve ser possível atualizar um filme pelo id recebido nos parâmetros da rota.

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
  // repare no valor enviado e no recebido do id
  "id": 4,
  "name": "Filme 04",
  "description": null,
  "duration": 130,
  "price": 200
}
```

### **DELETE - /movies/:id**

Deve ser possível deletar um filme pelo id recebido nos parâmetros da rota.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: **Nenhum body deve ser retornado**               |
| Status code: <b style="color:green">204 NO CONTENT</b> |

```json

```
