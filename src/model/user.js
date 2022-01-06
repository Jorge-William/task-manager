const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User