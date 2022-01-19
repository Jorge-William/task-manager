const express = require('express')
const app = express()
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
