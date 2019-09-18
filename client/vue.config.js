module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
    //配置跨域
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api/', //配置寫到api(相同的部分)
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}