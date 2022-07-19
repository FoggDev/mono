import DotEnv from 'dotenv'

// const secretsEnvFile = 'env/secrets.env'
const serverRequiredEnvVariables = ['WEB', 'NODE_ENV']
export const clientRequiredEnvVariables = ['NODE_ENV', 'WEB_CONFIG']

export function loadEnvVariables(): void {
  const web = process.env.WEB

  if (!web || web === '') {
    process.stderr.write(
      `Missing WEB environment variable.\n` +
        `Run our command specifying the web, i.e. 'WEB=san-pancho-dev <your-command>\n`
    )

    process.exit(1)
  }

  const dotEnv = DotEnv.config({ path: `env/${web}.env` })

  if (dotEnv.error) {
    process.stderr.write(`Failed to read the .env file: ${JSON.stringify(dotEnv.error, null, 2)}\n`)

    process.exit(2)
  }

  const missingEnvVariables: Array<string> = []

  for (const requiredVariable of serverRequiredEnvVariables) {
    if (!process.env[requiredVariable]) {
      missingEnvVariables.push(requiredVariable)
    }
  }

  if (missingEnvVariables.length > 0) {
    process.stderr.write(
      `Environment missing variables: ${missingEnvVariables}. ` +
        `Did you include the correct WEB environment variable that maps to ` +
        `'/env/${web}.env'?\n`
    )

    process.exit(3)
  }
}

function readEnvironment() {
  loadEnvVariables()

  const env = {
    mode: process.env.NODE_ENV!,
    port: process.env.PORT!
  }

  return env
}

export const scriptEnvironment = readEnvironment()
