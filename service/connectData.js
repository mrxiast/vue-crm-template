let mongoose = require('mongoose')
let mongodbConfig = require('config').get('mongodb');
/**
 * debug 模式
 */
// mongoose.set('debug', true);
/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
// mongoose.Promise = global.Promise;
/**
 * 配置 MongoDb options
 */
// function getMongoOptions () {
//     let options = {
//         useMongoClient: true,
//         poolSize: 5, // 连接池中维护的连接数
//         reconnectTries: Number.MAX_VALUE,
//         keepAlive: 120,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     };

//     if (mongodbConfig.get('user')) options.user = mongodbConfig.get('user');
//     if (mongodbConfig.get('pass')) options.pass = mongodbConfig.get('pass');
//     if (mongodbConfig.get('replicaSet').get('name')) options.replicaSet = mongodbConfig.get('replicaSet').get('name');
// }
let options = {
    poolSize: 5, // 连接池中维护的连接数
    // reconnectTries: Number.MAX_VALUE,
    keepAlive: 120,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
/**
 * 拼接 MongoDb Uri
 *
 * @returns {string}
 */
function getMongoUri () {
    let mongoUri = 'mongodb://';
    let dbName = mongodbConfig.get('db');
    let replicaSet = mongodbConfig.get('replicaSet');
    if (replicaSet.get('name')) { // 如果配置了 replicaSet 的名字 则使用 replicaSet
        let members = replicaSet.get('members');
        for (let member of members) {
            mongoUri += `${member.host}:${member.port},`;
        }
        mongoUri = mongoUri.slice(0, -1); // 去掉末尾逗号
    } else {
        mongoUri += `${mongodbConfig.get('host')}:${mongodbConfig.get('port')}`;
    }
    mongoUri += `/${dbName}`;
    console.log(mongoUri, 'uriuri')
    return mongoUri;
}


// let mongoClient = mongoose.connect('mongodb://127.0.0.1:27017/test', )
let mongoClient = mongoose.connect(getMongoUri(), options);

mongoose.connection.on('connected', function () {
    console.log('连接成功')
})

mongoose.connection.on('error', function (err) {
    console.log('链接失败' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('连接断开')
})



/**
 * 关闭 Mongo 连接
 */
function close () {
    mongoClient.close();
}


module.exports = {
    mongoose,
    close,
};