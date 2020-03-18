const Mongoose = require('mongoose')

module.exports = new Mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    inPice: {
        type: String,
        require: true
    },
    salePice: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    comments: []
})