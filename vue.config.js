module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 80,
    https: false,
    hotOnly: false,
    // proxy: { 
    //   // 配置跨域
    //   '/api': {
    //     target: 'https://element-interface.herokuapp.com/api/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: app => {}
  }
};
