const express = require('express')

const router = express.Router()
let mongoose = require('mongoose')
const MonBlog = mongoose.model('monblog', {
    name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        required: true
    },
    comments: []
})

router.post('/login', function (req, res) {
    var query = req.body;
    if (query.account === 'admin' && query.password === '123456') {
        res.send({
            "code": 0,
            "message": "登录成功",
            "data": {
                "token": "abcdedfhijklmnokrjsuvmxyz"
            }
        })
    } else {
        res.send({
            "code": 500,
            "message": "账号或密码错误",
            "data": {
                "token": ""
            }
        })
    }
    console.log("post请求：参数", query);

})

router.post('/addItem', function (req, res) {
    var query = req.body
    new MonBlog(query).save((err) => {
        if (err) {
            res.send({
                "code": 500,
                "message": err,
                "data": {}
            })
        } else {
            res.send({
                "code": 200,
                "message": '操作成功'
            })
        }
    })
})

router.get('/getGoodsList', function (req, res) {
    MonBlog.find((err, data) => {
        if (err) {
            res.send({
                "code": 500,
                "message": err
            })
        }
        res.send({
            "code": 200,
            "message": '请求成功',
            "data": data
        })
    })
})
module.exports = router