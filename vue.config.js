// CommonJS的模块导出语法(该文件配合webpack运行,因此使用NodeJS语法风格)
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js'
    }
  },
  lintOnSave: false, //关闭语法检查(插件)

  // 第一种代理方式,仅可代理一个地址
  // devServer: {
  //   proxy: 'https://easydoc.net'
  // }

  // 第二种代理方式,更动态,识别前缀代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://easydoc.net',
        pathRewrite: {'^/api':''},  //清除前缀
        // ws: true, //用于支持websocket,默认为true
        // changeOrigin: true //用于控制请求头中的host值,true则设为目标主机,false则为本主机,默认为true
      }
    }
  }
}