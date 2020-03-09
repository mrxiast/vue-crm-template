'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')//通过webpack-merge实现webpack.dev.conf.js对webpack.base.config.js的继承
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//美化webpack的错误信息和日志的插件
const portfinder = require('portfinder')// 查看空闲端口位置，默认情况下搜索8000这个端口

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST //processs为node的一个全局对象获取当前程序的环境变量，即host
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  //规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',//控制台显示的选项有none, error, warning 或者 info
    historyApiFallback: true,
    hot: true,//热加载
    compress: true,//压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,//调试时自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,//接口代理
    quiet: true, // necessary for FriendlyErrorsPlugin //控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true
    watchOptions: {
      poll: config.dev.poll,//// 文件系统检测改动
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),//模块热替换插件，修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.// 显示文件的正确名字
    new webpack.NoEmitOnErrorsPlugin(),//当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中
    // https://github.com/ampedandwired/html-webpack-plugin
    // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      //端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      //友好地输出信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
