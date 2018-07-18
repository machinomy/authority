import * as Koa from 'koa'
import * as http from 'http'
import Logger from '@machinomy/logger'
import * as bodyParser from 'koa-bodyparser'
import Routes from './Routes'

const log = new Logger('authority:http-endpoint')

export default class HttpEndpoint {
  app: Koa
  private readonly port: number
  private server?: http.Server

  constructor (port: string, routes: Routes) {
    this.app = new Koa()
    this.app.use(bodyParser())
    this.app.use(routes.middleware)
    this.app.use(routes.allowedMethods)
    this.port = parseInt(port, 10)
  }

  async listen (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let server = this.app.listen(this.port, () => {
        this.server = server
        log.info('listen on port %d', this.port)
        resolve()
      })
      this.app.onerror = (error: Error) => {
        reject(error)
      }
    })
  }

  async close (): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.server) {
        this.server.close((error: Error) => {
          if (error) {
            reject(error)
          } else {
            this.server = undefined
            resolve()
          }
        })
      } else {
        reject(new Error('HttpEndpoint is not running'))
      }
    })
  }
}
