const express = require('express')

const router = express.Router()

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

module.exports = router