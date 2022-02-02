const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
require('./db/mongoose')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log('Server running on port', port)
})

// const hashingPassword = async (plainText) => {
// 	const hashedPassword = await bcrypt.hash(plainText, 8)
// 	const otherPassword = 'JW2019dan133'
// 	const hashToPlain = await bcrypt.compare(otherPassword, hashedPassword)

// 	console.log(hashedPassword)
// 	console.log(hashToPlain)
// }

// hashingPassword('JW2019dan132')
