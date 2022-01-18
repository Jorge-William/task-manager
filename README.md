# Task-manager (Backend - Rest API)


Esse repositório foi criado com o fim de exercitar minhas habilidades em Express.js, Postman, Rest API, Node.js, Mongoose e MongoDB


## Status
Em progresso (Falta o Delete)


### Padrão de dados de um usuário:

```
{
    "name": "Jorge William",
    "email": "will@meuprovedor.com",
    "age": 78,
    "password": "0098989"
}

```

### Padrão de dados de uma tarefa:

```
{
    "description": "Fazer tal coisa",
    "completed": true
}

```

### Conexão com o Banco de dados

```
const mongoose = require('mongoose')

mongoose.connect('mongodb://endereco:porta/nome-de-banco')

```

#### Endpoints:

- POST: /user (Cria um novo usuário)
- POST: /task (Cria uma nova tarefa)
- GET: /tasks (que retorna todas as tarefas contidas no banco de dados)
- GET: /users (que retorna todos os usuários contidos no banco de dados)
- GET: /task/id: (retorna uma tarefa específica - pelo id)
- GET:/user/id: (retorna um usuário específico - pelo id)
- PATCH: /task/id: atualiza os dados de uma tarefa específica (pelo id)
- PATCH: /user/id: atualiza os dados de um usuário específico (pelo id)
