const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

// ------------------ Cria um novo usuário
router.post('/user', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
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
		const token = await user.generateAuthToken()

		res.send({ user, token })
	} catch (error) {
		res.status(400).send()
	}
})

router.post('/user/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})
		await req.user.save()

		res.send({ message: 'deu certo' })
	} catch (error) {
		res.status(500).send()
	}
})

router.post('/user/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})

// ------------------ Busca todos os usuários do banco de dados (tipo select * no sql)
router.get('/user/me', auth, async (req, res) => {
	res.send(req.user)
})

// ------------------ Busca um usuário específico no banco de dados
router.get('/user/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)

		if (!user) {
			return res.status(404).send(error)
		}

		res.send(user)
	} catch (error) {
		return res.status(500).send()
	}
})

// ------------------ Atualiza os dados de um determinado usuário
router.patch('/user/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update)
	})

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Atualização invalida.' })
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
			return res.status(400).send({ message: 'Usuário não encontrado.' })
		}

		res.send(user)
	} catch (error) {
		res.status(500).send({ error: error })
	}
})

module.exports = router
