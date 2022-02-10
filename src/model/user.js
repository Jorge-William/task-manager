const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
})

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

	user.tokens = user.tokens.concat({ token })

	await user.save()

	return token
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error()
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error()
	}

	return user
}

// ------------------ tranforma em hash o password com texto normal
userSchema.pre('save', async function (next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
