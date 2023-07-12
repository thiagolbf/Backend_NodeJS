# API - Movies

#### Projeto (Back-End) de uma API REST para registro de desenvolvedores e seus projetos.

### Tecnologias utilizadas;

- Node.JS
- Express.JS
- Typescript
- pg
- pg-format
- postgreSQL (1:1 , 1:N, N:N)

##### Relacionamentos:

- Um desenvolvedor pode ter apenas uma informação adicional, assim como, uma informação adicional pode pertencer à apenas um desenvolvedor.
- Um desenvolvedor pode ter muitos projetos, porém, um projeto pode pertencer a apenas um desenvolvedor.
- Um projeto pode ter múltiplas tecnologias e uma tecnologia pode pertencer a vários projetos.

### Tabelas

##### developer_infos

| Coluna         | Especificações                               |
| -------------- | -------------------------------------------- |
| id             | inteiro, auto incrementável e chave primária |
| developerSince | data e obrigatório                           |
| preferredOS    | OS e obrigatório                             |

##### developers

| Coluna          | Especificações                               |
| --------------- | -------------------------------------------- |
| id              | inteiro, auto incrementável e chave primária |
| name            | string, tamanho 50 e obrigatório             |
| email           | string, tamanho 50, obrigatório e único      |
| developerInfoId | inteiro, único e chave estrangeira           |

##### projects

| Coluna        | Especificações                                    |
| ------------- | ------------------------------------------------- |
| id            | número, incrementação automática e chave primária |
| name          | string, tamanho 50 e obrigatório                  |
| estimatedTime | string, tamanho 20 e obrigatório                  |
| repository    | string, tamanho 120 e obrigatório                 |
| startDate     | data e obrigatório                                |
| endDate       | data                                              |
| developerId   | inteiro, obrigatório e chave estrangeira          |

##### technologies

| Coluna | Especificações                               |
| ------ | -------------------------------------------- |
| id     | inteiro, auto incrementável e chave primária |
| name   | string, tamanho 30 e obrigatório             |

##### projects_technologies

| Coluna       | Especificações                               |
| ------------ | -------------------------------------------- |
| id           | inteiro, auto incrementável e chave primária |
| name         | string, tamanho 30 e obrigatório             |
| projectId    | inteiro, obrigatório e chave estrangeira     |
| technologyId | inteiro, obrigatório e chave estrangeira     |

### Endpoints do serviço: (Rotas)

#### developers

| Verbo  | Rota                     | Descrição                                     |
| ------ | ------------------------ | --------------------------------------------- |
| POST   | /developers              | Cadastrar um novo desenvolvedor.              |
| GET    | /developers/:id          | Listar um desenvolvedor.                      |
| GET    | /developers/:id/projects | Listar todos os projetos de um desenvolvedor. |
| GET    | /developers              | Listar todos os desenvolvedores.              |
| PATCH  | /developers/:id          | Atualizar um desenvolvedor.                   |
| DELETE | /developers/:id          | Remover um desenvolvedor.                     |
| POST   | /developers/:id/infos    | Cadastrar as infos a mais de desenvolvedor.   |
| PATCH  | /developers/:id/infos    | Atualizar as infos do desenvolvedor.          |

#### projects

| Verbo  | Rota                             | Descrição                                 |
| ------ | -------------------------------- | ----------------------------------------- |
| POST   | /projects                        | Cadastrar um novo projeto.                |
| GET    | /projects/:id                    | Listar um projeto pelo id.                |
| GET    | /projects                        | Listar todos os projetos.                 |
| PATCH  | /projects/:id                    | Atualizar um projeto.                     |
| DELETE | /projects/:id                    | Excluir um projeto.                       |
| POST   | /projects/:id/technologies       | Cadastrar uma tecnologia para um projeto. |
| DELETE | /projects/:id/technologies/:name | Deletar uma tecnologia de um projeto.     |
