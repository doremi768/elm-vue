module.exports = {
  devServer: {
    open: true,
    host: '192.168.3.81',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: { 
      // 配置跨域
      '/api': {
        target: 'https://element-interface.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};
