const express = require('express');
const cors = require('cors');

const { v4: uuidv4, validate } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

/* 
  Middleware para verificar:
    - Rota solicitada
    - Método utilizado
*/

function middlewareApiLog(request, response, next) {
  var fullUrl =
    request.protocol + "://" + request.get("host") + request.originalUrl;

  console.log("----------------------------------------------------");
  console.log("Log: ", "INICIO");
  console.log("rota solicitada: ", fullUrl);
  console.log("metodo: ", request.method);
  console.log("----------------------------------------------------");
  console.log("headers: ", request.headers);
  console.log("routeParams: ", request.params);
  console.log("queryParams: ", request.query);
  console.log("body: ", request.body);
  console.log("----------------------------------------------------");
  console.log("Log: ", "FIM");
  console.log("----------------------------------------------------");

  return next();
}

/* 
  Adicionando o middlewareApiLog para todas as rotas
*/

app.use(middlewareApiLog);

/* 
  Middleware para validação do usuário da requisição
*/

function checksExistsUserAccount(request, response, next) {

  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;

  return next();

}

/* 
  Middleware para validação do tipo de conta do usuário
*/

function checksCreateTodosUserAvailability(request, response, next) {

  const { user } = request;

  if (user.pro === false && user.todos.length >= 10) {
    return response.status(403).json({ error: "User is not pro" });
  }

  return next();

}

/* 
  Middleware para validação da existência do TODO
*/

function checksTodoExists(request, response, next) {

  const { username } = request.headers;
  const { id } = request.params;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  if (!validate(id)) {
    return response.status(400).json({ error: "Invalid id" });
  }

  const todo = user.todos.find(todo => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  request.user = user;
  request.todo = todo;

  return next();

}

/* 
  Middleware para buscar o usuário pelo ID
*/

function findUserById(request, response, next) {

  const { id } = request.params;

  const user = users.find(user => user.id === id);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;

  return next();

}

/* 
  Métodos a rota /users
  Buscar todos os usuários
*/

app.get('/users', (request, response) => {
  return response.json(users);
});

/* 
  Métodos a rota /users/:id
  Buscar um usuário pelo ID
*/

app.get('/users/:id', findUserById, (request, response) => {
  const { user } = request;

  return response.json(user);
});

/* 
  Métodos a rota /users
  Adicionar um novo usuário
*/

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExists = users.some((user) => user.username === username);

  if (usernameAlreadyExists) {
    return response.status(400).json({ error: 'Username already exists' });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    pro: false,
    todos: []
  };

  users.push(user);

  return response.status(201).json(user);
});

/* 
  Métodos a rota /users/:is/pro
  Atualizar o status de um usuário para PRO
*/

app.patch('/users/:id/pro', findUserById, (request, response) => {
  const { user } = request;

  if (user.pro) {
    return response.status(400).json({ error: 'Pro plan is already activated.' });
  }

  user.pro = true;

  return response.json(user);
});

/* 
  Métodos a rota /todos
  Buscar todos os todos de um usuário
*/

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

/* 
  Métodos a rota /todos
  Adicionar um novo todo
*/

app.post('/todos', checksExistsUserAccount, checksCreateTodosUserAvailability, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,
    created_at: new Date()
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

/* 
  Métodos a rota /todos/:id
  Atualizar um todo
*/

app.put('/todos/:id', checksTodoExists, (request, response) => {
  const { title, deadline } = request.body;
  const { todo } = request;

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

/* 
  Métodos a rota /todos
  Fechar um todo
*/

app.patch('/todos/:id/done', checksTodoExists, (request, response) => {
  const { todo } = request;

  todo.done = true;

  return response.json(todo);
});

/* 
  Métodos a rota /todos
  Apagar um todo
*/

app.delete('/todos/:id', checksExistsUserAccount, checksTodoExists, (request, response) => {
  const { user, todo } = request;

  const todoIndex = user.todos.indexOf(todo);

  if (todoIndex === -1) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();
});

module.exports = {
  app,
  users,
  checksExistsUserAccount,
  checksCreateTodosUserAvailability,
  checksTodoExists,
  findUserById
};