# Task-manager (Backend - Rest API)


Esse repositório foi criado com o fim de exercitar minhas habilidades em Express.js, Postman, Rest API, Node.js, Mongoose e MongoDB

![Captura de Tela 2022-02-10 às 15 55 09](https://user-images.githubusercontent.com/19416864/153477103-2f7e6962-6dc0-4388-bb53-c7809fdf5973.png)


## Status
Em progresso...

## O que apredi?
- As operações CRUD com node(Express)
- JWT (JSON Web Token)
- Encriptação de dados
- Rest API
- Organização de pastas no lado do servidor
- Configurar Postman
- Conexão e operações do MondoDB com o ODM(Object Data Model) Mongoose 

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
**C**
- POST: /user (Cria um novo usuário)
- POST: /task (Cria uma nova tarefa)

**R**
- GET: /tasks (que retorna todas as tarefas contidas no banco de dados)
- GET: /users (que retorna todos os usuários contidos no banco de dados)
- GET: /task/id: (retorna uma tarefa específica - pelo id)
- GET:/user/id: (retorna um usuário específico - pelo id)

**U**
- PATCH: /task/id: (atualiza os dados de uma tarefa específica - pelo id)
- PATCH: /user/id: (atualiza os dados de um usuário específico - pelo id)

**D**
- DELETE: /task/id: (deleta uma determinada tarefa - pelo seu id)
- DELETE: /user/id: (deleta um determinado usuário - pelo seu id)
