const express = require('express')
const router = express.Router()
const UserModel = require('./userModel.js')
const encrypt = require('../../utils/encrypt')

router.post('/register', function (req, res) {
    let query = req.body
    let isOk = false
    query.password = encrypt.Decrypt(query.password)
    UserModel.find((err, data) => {
        if (!err) {
            data.forEach(item => {
                if (item.userName === query.userName) {
                    isOk = true
                    return
                }
            })
            if (!isOk) {
                new UserModel(query).save((error) => {
                    if (error) {
                        res.send({
                            "code": 500,
                            "message": error
                        })
                    } else {
                        res.send({
                            "code": 200,
                            "message": '注册成功'
                        })
                    }
                })
            } else {
                console.log('987')
                res.send({
                    "code": 500,
                    "message": '账号名已被占用！'
                })
            }

        } else {

            res.send({
                "code": 500,
                "message": err
            })
        }

    })

})
router.post('/login', function (req, res) {
    let query = req.body;
    let isOk = false
    query.password = encrypt.Decrypt(query.password)
    UserModel.find((err, data) => {
        if (!err) {
            data.forEach(item => {
                if (item.userName === query.userName && item.password === query.password) {
                    isOk = true
                    return
                }
            })
            if (isOk) {
                res.send({
                    "code": 200,
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
        } else {
            res.send({
                "code": 500,
                "message": err
            })
        }

    })
})

module.exports = router