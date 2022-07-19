import { Configuration } from 'webpack'

const webpackProdConfig: (args: { presets: string[] }) => Configuration = () => {
  const webpackConfig: Configuration = {
    mode: 'production',
    output: {
      filename: '[name].[contenthash].js'
    }
  }

  return webpackConfig
}

export default webpackProdConfig
