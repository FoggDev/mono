import { ClientEnv } from './clientEnv'
import { DeploymentType, Web, WebBuilderConfiguration, WebConfiguration } from './configTypes'
import { config as sanPanchoConfig } from './websites/san-pancho/config'

const getWebConfig = (web: Web): WebConfiguration => {
  switch (web) {
    case Web.SAN_PANCHO:
      return sanPanchoConfig
    default:
      break
  }

  throw new Error(
    `Cannot find config for 'src/projects/${ClientEnv.WEB_CONFIG}'. ` +
      `Is it specified correctly in env/${ClientEnv.WEB_CONFIG}.env?`
  )
}

const buildConfig = (): WebBuilderConfiguration => {
  const requiredEnvVariables: ClientEnv[] = ['NODE_ENV', 'WEB_CONFIG']

  requiredEnvVariables.forEach(envVariable => {
    if (!ClientEnv[envVariable]) {
      throw Error(
        `Missing required variable '${envVariable}'.\n` +
          `On server, make sure it's in the environment during webpack execution.\n`
      )
    }
  })

  const web = ClientEnv.WEB_CONFIG as Web
  const webConfig = getWebConfig(web)
  const deploymentType = ClientEnv.DEPLOYMENT_TYPE as DeploymentType

  const isClient = typeof window !== 'undefined'

  const mode = ClientEnv.NODE_ENV === 'production' ? 'production' : 'development'
  const isProduction = mode === 'production'
  const isSSR = ClientEnv.SSR === 'true'

  const config: WebBuilderConfiguration = {
    ...webConfig,
    web,
    theme: {},
    mode,
    isSSR,
    isClient,
    isProduction,
    homeUrl: `https://${webConfig.domainName}`,
    deploymentType,
    publicPath: isProduction ? '' : `http://localhost:3001/`
  }

  return config
}

const Config = buildConfig()

export default Config
