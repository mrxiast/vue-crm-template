const Mongoose = require('mongoose')
module.exports = new Mongoose.Schema({
    userName: String,
    password: String,
    idCard: String,
    email: String
})