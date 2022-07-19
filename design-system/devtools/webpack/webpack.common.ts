import { resolve } from 'path'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components'
import { Configuration } from 'webpack'

const webpackCommonConfig: () => Configuration = () => {
  const webpackConfig: Configuration = {
    entry: './src/index.ts',
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
      fallback: {
        buffer: false,
        crypto: false,
        stream: false
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            {
              include: [resolve(__dirname, '../../src/components/Spinner/loaders')],
              use: 'svg-url-loader'
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [
                createStyledComponentsTransformer({
                  displayName: true,
                  ssr: true,
                  minify: true
                })
              ]
            })
          }
        }
      ]
    }
  }

  return webpackConfig
}

export default webpackCommonConfig
