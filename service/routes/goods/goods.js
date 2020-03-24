const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const schema = require('../collections/goodsSchema.js')

const Add = mongoose.model('add', schema)


router.post('/addItem', function (req, res) {
    var query = req.body
    new Add(query).save((err) => {
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
    let query = req.query
    let getData = {
        pageNum: query.pageNum || 1,
        pageSize: query.pageSize || 10,
        serchInfo: {
            name: ''
        },

    }

    console.log(getData, 'query')
    let total = 0
    Add.count().exec(function (err, data1) {
        console.log(data1, 'data')
        total = data1

        Add.find().sort({ '_id': -1 })
            .skip((getData.pageNum - 1) * getData.pageSize)
            .limit(getData.pageSize * 1)
            .exec(function (err, data) {
                if (err) {
                    res.send({
                        "code": 500,
                        "message": err
                    })
                }
                res.send({
                    "code": 200,
                    "message": '请求成功',
                    "data": data,
                    "total": total
                })

            })
    })
})

router.post('/delItem', function (req, res) {
    let query = req.body
    Add.remove(query, (err, result) => {
        if (err) {
            res.send({
                "code": 500,
                "message": err
            })
        } else {
            res.send({
                "code": 200,
                "message": '操作成功'
            })
        }
    })
})

router.post('/changeItem', function (req, res) {
    let query = req.body
    Add.updateOne(
        { '_id': query._id },
        {
            "name": query.name,
            "inPice": query.inPice,
            "salePice": query.salePice,
            "type": query.type
        },
        function (err, result) {
            if (!err) {
                res.send({
                    "code": 200,
                    "message": "修改成功"
                })
            } else {
                res.send({
                    "code": 500,
                    "message": err
                })
            }
        })
})
module.exports = router