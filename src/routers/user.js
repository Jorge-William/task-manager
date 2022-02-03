const express = require('express')
const router = new express.Router()
const User = require('../model/user')

// ------------------ Cria um novo usuário
router.post('/user', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		res.status(201).send(user)
		console.log('User saved!!')
	} catch (error) {
		await res.status(400).send(error)
	}
})

// ------------------ Login de usuário
router.post('/user/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		)
		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})

// ------------------ Busca todos os usuários do banco de dados (tipo select * no sql)
router.get('/users', async (req, res) => {
	try {
		const result = await User.find({})
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

// ------------------ Busca um usuário específico no banco de dados
router.get('/user/:id', async (req, res) => {
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

// ------------------ Atualiza os dados de um determinado usuário
router.patch('/user/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']

	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update)
	})

	// console.log(isValidOperation)

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' })
	}

	try {
		const user = await User.findById(req.params.id)

		updates.forEach((update) => (user[update] = req.body[update]))

		await user.save()

		if (!user) {
			return res.status(400).send()
		}

		res.send(user)
	} catch (error) {
		res.status(error)
	}
})

// ------------------ Deleta um usuário pelo id ------------------------
router.delete('/user/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if (!user) {
			return res.status(400).send({ message: 'User not found' })
		}

		res.send(user)
	} catch (error) {
		res.send({ error: error })
	}
})

module.exports = router
