const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

app.use(express.json())

const port = process.env.PORT || 3001

// ------------------ Cria um novo usuário
app.post('/users', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		res.status(201).send(user)
		console.log('User saved!!')
	} catch (error) {
		await res.status(400).send(error)
	}
})

// --------------------- Cria uma nova tarefa
app.post('/tasks', async (req, res) => {
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

// ------------------ Busca todos os usuários do banco de dados (tipo select * no sql)
app.get('/users', async (req, res) => {
	try {
		const result = await User.find({})
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

// ------------------ Busca um usuário específico no banco de dados
app.get('/users/:id', async (req, res) => {
	const _id = req.params.id
	try {
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).send(error)
		}
		res.status(200).send(user)
	} catch (error) {
		return res.status(404).send(error)
	}
})

// ------------------ Busca todas as tarefas
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find()
		res.status(404).send(tasks)
	} catch (error) {
		res.status(404).send(error)
	}
})

// ------------------ Busca tarefa por _id
app.get('/task/:id', async (req, res) => {
	const _idTask = req.params.id
	try {
		const task = await Task.findById(_idTask)

		if (!task) {
			return res.status(404).send()
		}

		res.status(200).send(task)
	} catch (error) {
		res.status(404).send(error)
	}
})

// ------------------ Atualiza os dados de um determinado usuário
app.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => {
		allowedUpdates.includes(update)
	})

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' })
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!user) {
			return res.status(400).send()
		}

		res.send(user)
	} catch (error) {
		res.send(error)
	}
})

app.listen(port, () => {
	console.log('Server running on port', port)
})
