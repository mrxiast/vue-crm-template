const mongoose = require('mongoose')

const userSchema = require('../collections/userSchema')

module.exports = mongoose.model('user', userSchema)