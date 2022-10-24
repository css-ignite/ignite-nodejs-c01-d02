# Ignite - Trilha NodJS - Chapter I - Desafio 02 - Todos (Middleware)

## Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no Node.js!

Nesse desafio você irá trabalhar mais a fundo com middlewares no Express. Dessa forma você será capaz de fixar mais ainda os conhecimentos obtidos até agora.

O código utilizado será o mesmo do Desafio 01, com algumas implementações adicionais referentes aos middlewares.

## Requisitos do Projeto

Essa será uma aplicação para gerenciar tarefas (em inglês `todos`).
Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de `todos`:

- Criar um novo `todo`;
- Listar todos os `todos`;
- Alterar o `title` e `deadline` de um `todo` existente;
- Marcar um `todo` como feito;
- Excluir um `todo`;

Tudo isso para cada usuário em específico. Além disso, dessa vez teremos um plano grátis onde o usuário só pode criar até dez todos e um plano Pro que irá permitir criar todos ilimitados, isso tudo usando middlewares para fazer as validações necessárias.

### Requisitos

- [x] Deve ser possível criar um novo `usuário`;
- [x] Deve ser possível criar um novo `todo`;
- [x] Deve ser possível listar os `todos`;
- [x] Deve ser possível alterar o `title` e `deadline` de um `todo` existente;
- [x] Deve ser possível marcar um `todo` como feito;
- [x] Deve ser possível deletar um `todo`;

### Requisitos Adicionais

- [x] Deve ser possível listar os `usuarios` cadastrados;

### Regras de Negócio

- [X] Não deve ser possível cadastrar um usuário com o mesmo `username`;
- [X] Não deve ser possível cadastrar um `todo` para um usuário inexistente;
- [X] Não deve ser possível listar os `todos` de um usuário inexistente;
- [X] Não deve ser possível alterar o `title` e `deadline` de um `todo` inexistente;
- [X] Não deve ser possível marcar um `todo` inexistente como feito;
- [X] Não deve ser possível deletar um `todo` inexistente;
- [X] Não deve ser possível incluir mais de 10 `todos` para um usuário que não seja `pro`;
- [X] Não deve ser possível alterar um `todo` de um usuário que não seja o dono;
- [X] Não deve ser possível marcar um `todo` de um usuário que não seja o dono;
- [X] Não deve ser possível deletar um `todo` de um usuário que não seja o dono;
- [X] Não deve ser possível alterar um `todo` não existente;
- [X] Não deve ser possível marcar um `todo` não existente;
- [X] Não deve ser possível deletar um `todo` não existente;

## Rotas da API

Detalhamento das rotas da API

### USERS

Gerênciamento de usuários

Rota: `/users`

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| POST | [http://{apiBaseUrl}/users](http://{apiBaseUrl}/users) | Cria um novo usuário |
| PATCH | [http://{apiBaseUrl}/users/:id/pro](http://{apiBaseUrl}/users/:id/pro) | Tornar uma conta de usuário Pró |
| GET | [http://{apiBaseUrl}/users](http://{apiBaseUrl}/users) | Lista todos os usuários |
| GET | [http://{apiBaseUrl}/users/:id](http://{apiBaseUrl}/users/:id) | Lista um usuário pelo ID |

### Modelo do JSON de entrada

Json para criação de um novo usuário

```json

{ 
    "name": "Nome Completo do Usuário", 
    "username": "login de acesso"
}

```

### Modelo do JSON de saída

Json retornado após a criação de um novo usuário

```json

{
    "id": "ad1a5496-361e-4462-9c67-180ce22e0807",
    "name": "Nome Completo do Usuário",
    "username": "login de acesso",
    "todos": []
}

```

### TODOS

Gerênciamento de tarefas

Rota: `/todos`

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| POST | [http://{apiBaseUrl}/todos](http://{apiBaseUrl}/todos) | Cria um novo todo |
| GET | [http://{apiBaseUrl}/todos](http://{apiBaseUrl}/todos) | Lista todos os todos |
| PUT | [http://{apiBaseUrl}/todos/:id](http://{apiBaseUrl}/todos/:id) | Altera o title e o deadline de um todo |
| PATCH | [http://{apiBaseUrl}/todos/:id/done](http://{apiBaseUrl}/todos/:id/done) | Altera o status de um todo para done |
| DELETE | [http://{apiBaseUrl}/todos/:id](http://{apiBaseUrl}/todos/:id) | Deleta um todo |

### Modelo do JSON de entrada

Json para criação de uma nova tarefa "TODO"

```json

{ 
    "title": "Nome da tarefa"
}

```

### Modelo do JSON de saída

Json retornado após a criação de uma nova tarefa "TODO"

```json

{
    "id": "fcfe9ff4-bc61-4127-a761-69edb64ff047",
    "title": "Nome da tarefa",
    "done": false,
    "deadline": null,
    "created_at": "2022-10-24T16:15:28.749Z"
}

```

## Executando o projeto

### Iniciar o repositório do Exemplo

```bash

# Baixar as dependências
npm install

```

### Iniciar o servidor

```bash

# Executar o servidor
npm run dev

```

### Executar os testes

```bash

# Executar os testes
npm run test

```
