import * as dotenv from 'dotenv'

export interface Configuration {
  port: string,
  databaseUrl: string
}

export namespace Configuration {
  export async function env (options?: dotenv.DotenvOptions): Promise<Configuration> {
    dotenv.load(options)

    return {
      port: process.env.PORT || '5500',
      databaseUrl: process.env.DATABASE_URL || 'postgres://localhost@authority'
    }
  }
}

export default Configuration
