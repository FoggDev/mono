import HtmlWebPackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const webpackDevConfig: () => Configuration = () => {
  const webpackConfig: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './preview/index.tsx',
    devServer: {
      historyApiFallback: true,
      static: resolve(__dirname, '../../dist'),
      compress: true,
      hot: true,
      port: 3003
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        title: 'Preview',
        template: './preview/index.html',
        filename: './index.html'
      })
    ]
  }

  return webpackConfig
}

export default webpackDevConfig
