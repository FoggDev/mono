import { resolve } from 'path'
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin'
import { Configuration, IgnorePlugin, optimize, WebpackPluginInstance } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import nodeExternals from 'webpack-node-externals'
import WebpackBar from 'webpackbar'

const isAnalyze = Boolean(process.env.ANALYZE)
const analyzerPort = 9000
const hotPoll = 300

const webpackServerConfig: (args: { mode: string }) => Configuration = ({ mode }) => {
  const isDevelopment = mode === 'development'

  const limitChunkCountPlugin: WebpackPluginInstance = new optimize.LimitChunkCountPlugin({
    maxChunks: 1
  })

  const ignorePlugin: WebpackPluginInstance = new IgnorePlugin({
    resourceRegExp: /\.((sc|c)ss|jpe?g|png|gif|svg)$/i
  })

  const webpackBarPlugin: WebpackPluginInstance = new WebpackBar({
    name: 'server',
    color: '#2EA1F8',
    profile: true,
    basic: false
  })

  const webpackConfig: Configuration = {
    target: 'node',
    entry: ['./src/server/index.tsx'],
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server.js',
      path: resolve('dist')
    },
    externals: [nodeExternals()],
    plugins: [limitChunkCountPlugin, ignorePlugin, webpackBarPlugin]
  }

  if (isDevelopment) {
    webpackConfig.watch = true

    if (webpackConfig.entry instanceof Array) {
      webpackConfig.entry.unshift(`webpack/hot/poll?${hotPoll}`)
    }

    if (webpackConfig.plugins instanceof Array) {
      webpackConfig.plugins.push(
        new RunScriptWebpackPlugin({
          name: 'server.js',
          nodeArgs: ['--inspect']
        })
      )
    }

    webpackConfig.externals = [
      nodeExternals({
        allowlist: [`webpack/hot/poll?${hotPoll}`]
      })
    ]
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

export default webpackServerConfig
