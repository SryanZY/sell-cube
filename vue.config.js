const path = require('path')
const webpack = require('webpack')
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: '',
  devServer: {
    // 在服务内部的所有其他中间件之前，提供执行自定义中间件的功能。
    // 这可以用来配置自定义处理程序
    before (app) {
      app.get('/api/seller', (req, res) => {
        const id = req.query.id
        res.json({
          errno: 0,
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    },

    overlay: {
      warnings: true,
      errors: true
    },
    port: 8081,
    open: true
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  // 修改webpack的配置
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
    // 处理moment的语言包文件，减少打包体积
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
