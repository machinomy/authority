import Configuration from './Configuration'
import { memoize } from 'decko'
import Controller from './Controller'
import HttpEndpoint from './HttpEndpoint'
import Routes from './Routes'

export default class Registry {
  configuration: Configuration

  private constructor (configuration: Configuration) {
    this.configuration = configuration
  }

  static async build (parameters: Configuration): Promise<Registry> {
    return new Registry(parameters)
  }

  @memoize
  async controller (): Promise<Controller> {
    const databaseURL = this.configuration.databaseUrl
    return new Controller(databaseURL)
  }

  @memoize
  async routes (): Promise<Routes> {
    const controller = await this.controller()
    return new Routes(controller)
  }

  @memoize
  async httpEndpoint (): Promise<HttpEndpoint> {
    const routes = await this.routes()
    return new HttpEndpoint(this.configuration.port, routes)
  }
}
