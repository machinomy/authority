import * as pg from 'pg'
import Configuration from './Configuration'
import Registry from './Registry'
import Logger from '@machinomy/logger'

const log = new Logger('authority')

export default class Authority {
  registry: Registry

  constructor (registry: Registry) {
    this.registry = registry
  }

  static async build (configuration: Configuration): Promise<Authority> {
    const registry = await Registry.build(configuration)
    return new Authority(registry)
  }

  async start (): Promise<void> {
    await this.ensureDatabaseConnected()
    const endpoint = await this.registry.httpEndpoint()
    const running = endpoint.listen()
    log.info('start authority')
    return running
  }

  async ensureDatabaseConnected () {
    const client = new pg.Client({ connectionString: this.registry.configuration.databaseUrl })
    return client.connect().catch(() => {
      throw Error(`Database is not available via URL "${this.registry.configuration.databaseUrl}"!`)
    })
  }
}
