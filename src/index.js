const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

app.use(express.json())

const port = process.env.PORT || 3001

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

app.post('/tasks', (req, res) => {
	const task = new Task(req.body)

	task.save().then((task) => {
		res.status(201).send(task)
	}).catch((error) => {
		res.status(400).send(error)
	})

})


app.listen(port, () => {
	console.log('Server running on port', port)
})