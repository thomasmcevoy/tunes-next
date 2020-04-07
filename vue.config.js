module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tunes-next/' : '/',
  configureWebpack: {
    devtool: 'source-map'
  }
}
