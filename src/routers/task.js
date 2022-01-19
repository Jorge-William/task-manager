const express = require('express')
const router = new express.Router()
const Task = require('../model/task')

// --------------------- Cria uma nova tarefa
router.post('/task', async (req, res) => {
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

// ------------------ Busca todas as tarefas
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find()
		res.status(404).send(tasks)
	} catch (error) {
		res.status(404).send(error)
	}
})

// ------------------ Busca tarefa por _id
router.get('/task/:id', async (req, res) => {
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

// ------------------ Atualiza os dados de uma determinda tarefa---------------------
router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const updateValid = updates.every((update) => {
		return allowedUpdates.includes(update)
	})

	if (!updateValid) {
		return res.status(400).send({ error: 'Invalid Update' })
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!task) {
			return res.status(400).send({ error: 'Task not updated' })
		}

		res.send(task)
	} catch (error) {
		res.send({ error: error })
	}
})

// ------------------ Deleta uma tarefa pelo id -----------------------
router.delete('/task/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id)

		if (!task) {
			return res.status(400).send({ message: 'task not found' })
		}

		res.send(task)
	} catch (error) {
		res.send({ error: error })
	}
})

module.exports = router
