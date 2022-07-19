export const enum Web {
  SAN_PANCHO = 'san-pancho'
}

export type Mode = 'production' | 'development'

export enum DeploymentType {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development'
}

export interface WebConfiguration {
  webTitle: string
  domainName: string
}

export interface WebBuilderConfiguration extends WebConfiguration {
  web: Web
  isClient: boolean
  isProduction: boolean
  mode: Mode
  homeUrl: string
  isSSR: boolean
  deploymentType: DeploymentType
  publicPath: string
}
