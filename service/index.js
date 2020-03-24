const express = require('express')
const path = require('path')//使用path.join智能拼接url字符串
const app = express()
// 引入json解析中间件
const bodyParser = require('body-parser');
//引入了会自动执行
require('./connectData')
// 允许所有的请求形式 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/routers.js'))
app.use('/', require('./routes/goods/goods.js'))
app.use('/', require('./routes/user/index'))

// 利用express.static中间件来托管静态资源。
app.use(express.static('imgs'));

app.get('/', function (req, res) {
    console.log(__dirname + "/imgs/bg.jpg", '121')
    res.sendFile(__dirname + "/imgs/bg.jpg");
})
app.listen(3000, function () {
    console.log('走起')
})