export const ClientEnv = {
  DEPLOYMENT_TYPE: process.env.DEPLOYMENT_TYPE!,
  NODE_ENV: process.env.NODE_ENV!,
  WEB_CONFIG: process.env.WEB_CONFIG!,
  SSR: process.env.SSR!
} as const

export type ClientEnv = keyof typeof ClientEnv
