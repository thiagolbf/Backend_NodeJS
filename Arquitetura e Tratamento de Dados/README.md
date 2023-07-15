# API - Movies

#### Projeto (Back-End) de uma API REST de CRUD de usuário + Permissão de Administrador.

### Tecnologias utilizadas;

- Node.JS
- Express.JS
- Express-async-errors
- Typescript
- Pg
- Pg-format
- Zod
- Bcryptjs
- Jsonwebtoken
- PostgreSQL

##### Regras do Serviço:

- As rotas GET, PATCH, DELETE e PUT devem estar protegidas por um middleware de validação do token JWT.
- A rota de /login Deve validar se o usuário existe, se ele está ativo e se a senha está correta.
- Na rota /users/:id/recover o active deve ser alterado para true.

### Tabela

##### users

| Coluna   | Especificações                                        |
| -------- | ----------------------------------------------------- |
| id       | inteiro, sequencial e chave primária                  |
| name     | caractere, tamanho máximo de 20 e obrigatório         |
| email    | caractere, tamanho máximo de 100, único e obrigatório |
| password | caractere, tamanho máximo de 120 e obrigatório        |
| admin    | booleano, obrigatório e falso por padrão              |
| active   | booleano, obrigatório e verdadeiro por padrão         |

### Endpoints do serviço: (Rotas)

#### developers

| Verbo  | Rota               | Descrição                           |
| ------ | ------------------ | ----------------------------------- |
| POST   | /users             | Criação de usuários.                |
| POST   | /login             | Gera o token JWT.                   |
| GET    | /users             | Lista todos os usuários.            |
| GET    | /users/profile     | Retorna os dados do usuário logado. |
| PATCH  | /users/:id         | Atualiza os dados de um usuário.    |
| DELETE | /users/:id         | Faz um soft delete do usuário.      |
| PATCH  | /users/:id/recover | Ativa um usuário que foi inativado  |
