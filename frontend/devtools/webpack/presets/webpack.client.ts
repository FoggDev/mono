import HtmlWebpackPlugin from 'html-webpack-plugin'
import { address } from 'ip'
import { Configuration, WebpackPluginInstance } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import WebpackBar from 'webpackbar'

const isAnalyze = Boolean(process.env.ANALYZE)
const port = Number(process.env.PORT ?? 3000)
const devServerPort = port + 1
const analyzerPort = 9001

const webpackClientConfig: (args: { mode: string }) => Configuration = ({ mode }) => {
  const isProductionMode = mode === 'production'

  // Plugins
  const htmlWebpackPlugin: WebpackPluginInstance = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
  })

  const webpackBarPlugin: WebpackPluginInstance = new WebpackBar({
    name: 'client',
    color: '#2EA1F8'
  })

  const plugins = [webpackBarPlugin]

  if (!isProductionMode) {
    plugins.push(htmlWebpackPlugin)
  }

  const webpackConfig: Configuration = {
    entry: {
      main: './src/index.tsx'
    },
    output: {
      publicPath: `http://${address()}:${devServerPort}/`
    },
    plugins
  }

  if (isProductionMode) {
    webpackConfig.output = {
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/'
    }
  }

  if (isAnalyze) {
    webpackConfig.plugins = [
      ...(webpackConfig.plugins || []),
      new BundleAnalyzerPlugin({
        analyzerPort
      })
    ]
  }

  return webpackConfig
}

export default webpackClientConfig
