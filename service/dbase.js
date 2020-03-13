let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', function () {
    console.log('连接成功')
})

mongoose.connection.on('error', function (err) {
    console.log('链接失败' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('连接断开')
})



const tableItem = mongoose.model('tableitem', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
})



module.exports = {
    mongoose,
    tableItem
}