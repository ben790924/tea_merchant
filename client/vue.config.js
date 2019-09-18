module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
    //配置跨域
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}