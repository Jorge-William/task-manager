const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validade(value) {
			if (!validator.isEmail(value)) {
				throw new Error('You should insert a valid email')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('The number should be greater than 0.')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (value.length < 6 || validator.contains(value, 'password')) {
				throw new Error('Insert a password with minimum six digits')
			}
		}
	}
})

const newUser = new User({
	name: 'Big batata',
	email: 'ba@9989.com     ',
	age: 71,
	password: '123456'
})


newUser.save().then(() => {
	console.log(newUser);
}).catch((error) => {
	console.log('Error!', error)
})

// const Task = mongoose.model('Task', {
// 	description: {
// 		type: String
// 	},
// 	completed: {
// 		type: Boolean
// 	}
// })

// const taskName = new Task({
// 	description: 'Wash my car',
// 	completed: false
// })

// taskName.save().then(() => {
// 	console.log(taskName)
// }).catch((error) => {
// 	console.log('Error', error);
// })