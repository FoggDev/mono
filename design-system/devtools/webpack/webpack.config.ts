import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import webpackCommonConfig from './webpack.common'
import { ConfigArgs } from './webpack.types'

// Mode Configuration (development/production)
const modeConfig: (args: ConfigArgs) => Promise<Configuration> = async ({ mode, presets }) => {
  const { default: webpackConfig } = await import(`./webpack.${mode}`)

  return webpackConfig({ mode, presets })
}

// Merging all configurations
const webpackConfig: (args: ConfigArgs) => Promise<Configuration> = async (
  { mode, presets } = {
    mode: 'production',
    presets: []
  }
) => {
  const commonConfiguration = webpackCommonConfig()
  const modeConfiguration = await modeConfig({ mode, presets })

  return merge(commonConfiguration, modeConfiguration)
}

export default webpackConfig
