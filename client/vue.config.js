module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {// 配置跨域
      '/api': {
        target: 'http://localhost:5000/api/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''// 请求的时候使用这个api就可以
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return {
          ...options,
          //  修复静态资源引用的问题 vue cli 2 => vue cli 3 升级之后配置项由 transformToRequire 改为 transformAssetUrls
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
            // 在这里添加需要使用静态资源的自定义元素
            'a-avatar': 'src'
          }
        }
      })
  }
}
