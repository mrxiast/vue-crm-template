'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}



module.exports = {
    //path.join将路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃
    //path.join('/a', '/b') // 'a/b',path.resolve('/a', '/b') // '/b'
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        //自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
        extensions: ['.js', '.vue', '.json'],
        //创建路径的别名，比如增加'axios': resolve('src/axios/index')等
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            pages: resolve('src/pages')
        }
    },
    //使用插件配置相应文件的处理方法
    module: {
        //使用vue-loader将vue文件转化成js的模块
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            //使用vue-loader将vue文件转化成js的模块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            //图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('src/icons')],
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        //防止webpack注入无用的setImmediate polyfill，因为Vue
        //source包含它（尽管只有在它是本机的情况下才使用它）。
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        //阻止webpack将模拟注入节点本机模块
        //这对客户来说毫无意义
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
