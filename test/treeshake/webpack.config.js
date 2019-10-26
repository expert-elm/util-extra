const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'none',
  stats: 'verbose',
  optimization: {
    minimize: false,
    concatenateModules: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: true
        }
      })
    ]
  }
}
