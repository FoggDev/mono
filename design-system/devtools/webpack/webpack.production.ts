import { resolve } from 'path'
import { Configuration } from 'webpack'

const webpackProdConfig: (args: { presets: string[] }) => Configuration = () => {
  const webpackConfig: Configuration = {
    mode: 'production',
    devtool: false,
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'lib',
      umdNamedDefine: true,
      globalObject: 'this'
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      },
      'react-router-dom': 'react-router-dom'
    }
  }

  return webpackConfig
}

export default webpackProdConfig
