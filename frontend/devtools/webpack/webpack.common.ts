import CopyWebpackPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components'
import webpack, { Configuration, WebpackPluginInstance } from 'webpack'

import { loadEnvVariables } from '../env'

const styledComponentsTransformer = createStyledComponentsTransformer()

const webpackCommonConfig: () => Configuration = () => {
  // Loading .env vars
  loadEnvVariables()

  // Local packages to compile
  const packagesToCompile = ['@web-builder/design-system']

  const copyPlugin: WebpackPluginInstance = new CopyWebpackPlugin({
    patterns: [
      { from: `src/websites/${process.env.WEB_CONFIG}/static/`, to: './' },
      { from: `src/static/`, to: './' }
    ]
  })

  // Loading env vars for production
  const definePlugin: WebpackPluginInstance = new webpack.DefinePlugin({
    'process.env': {
      MODE: JSON.stringify(process.env.NODE_ENV),
      PORT: JSON.stringify(process.env.PORT),
      WEB_CONFIG: JSON.stringify(process.env.WEB_CONFIG),
      DEPLOYMENT_TYPE: JSON.stringify(process.env.DEPLOYMENT_TYPE),
      SSR: JSON.stringify(process.env.SSR)
    }
  })

  const webpackConfig: Configuration = {
    output: {
      path: resolve('dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '~': resolve(__dirname, '../../src')
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader'
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: new RegExp(`node_modules/(?!(${packagesToCompile.join('|')}))`),
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [styledComponentsTransformer]
                })
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [copyPlugin, definePlugin]
  }

  return webpackConfig
}

export default webpackCommonConfig
