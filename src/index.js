const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

app.use(express.json())

const port = process.env.PORT || 3001

// ------------------ Cria um novo usuário
app.post('/users', (req, res) => {
	const user = new User(req.body)

	user.save()
		.then(
			(user) => {
				res.status(201).send(user)
				console.log('User saved!!')
			}
		)
		.catch(
			(error) => {
				res.status(400).send(error)
			}
		)
})

// --------------------- Cria uma nova tarefa
app.post('/tasks', (req, res) => {
	const task = new Task(req.body)

	task.save().then((task) => {
		res.status(201).send(task)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

// ------------------ Busca todos os usuários do banco de dados (tipo select * no sql)
app.get('/users', (req, res) => {
	User.find({}).then((queryResult) => {
		res.send(queryResult)
	}).catch((error) => {
		res.status(500).send()
	})
})

// ------------------ Busca um usuário específico no banco de dados
app.get('/users/:id', (req, res) => {
	const _id = req.params.id

	User.findById(_id).then((result) => {
		if (!result) {
			return res.status(404).send()
		}
		res.status(200).send(result)
	}).catch((error) => {
		res.status(404).send(error)
	})
})




app.listen(port, () => {
	console.log('Server running on port', port)
})