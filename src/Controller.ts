import Logger from '@machinomy/logger'
import * as Router from 'koa-router'
import { Middleware } from 'koa'
import * as sqlite3 from 'sqlite3'

const log = new Logger('authority:controller')

interface AddBCNodeRequest {
  name: string
  enode: string
  networkId: string
}

interface AddELNodeRequest {
  ethereumAddress: string
  nodeId: string
}

export default class Controller {
  middleware: Middleware
  allowedMethods: Middleware
  database: sqlite3.Database

  constructor (databaseURL: string) {
    const router = new Router()
    router.post('/bc-nodes', this.addBCNode.bind(this))
    router.post('/el-nodes', this.addELNode.bind(this))
    router.get('/bc-nodes', this.getBCNodes.bind(this))
    router.get('/el-nodes', this.getELNodes.bind(this))

    this.middleware = router.routes()
    this.allowedMethods = router.allowedMethods()
    if (databaseURL.startsWith('sqlite://') !== true) {
      log.error('Authority requires valid sqlite3 database URL in .env file or as env variable. Refer example.env file.')
      this.database = {} as sqlite3.Database
    } else {
      const dbPath = databaseURL.substring('sqlite://'.length, databaseURL.length)
      this.database = new sqlite3.Database(dbPath)
    }
  }

  async addBCNode (ctx: Router.IRouterContext) {
    const body = ctx.request.body! as AddBCNodeRequest
    log.info('ADD BC: This is a body: ' + JSON.stringify(body))
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const name = body!.name
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const enode = body!.enode
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const networkId = body!.networkId
    try {
      await this.sqlRun(
        'INSERT INTO bc_node(name, enode, networkId) VALUES ($name, $enode, $networkId)',
        {
          $name: name,
          $enode: enode,
          $networkId: networkId
        })
      ctx.status = 200
    } catch (error) {
      ctx.status = 400
      ctx.response.body = error
    }
  }

  async addELNode (ctx: Router.IRouterContext) {
    const body = ctx.request.body as AddELNodeRequest
    log.info('ADD EL: This is a body: ' + JSON.stringify(body))
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const ethereumAddress = body!.ethereumAddress
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const nodeId = body!.nodeId
    try {
      await this.sqlRun(
        'INSERT INTO el_node(ethereumAddress, enode) VALUES ($ethereumAddress, $nodeId)',
        {
          $ethereumAddress: ethereumAddress,
          $nodeId: nodeId
        })
      ctx.status = 200
    } catch (error) {
      ctx.status = 400
      ctx.response.body = error
    }
  }

  async getBCNodes (ctx: Router.IRouterContext) {
    log.info('GET BC NODES! ')
    try {
      const bcNodes = await this.sqlAll('SELECT name, enode, networkId FROM bc_node')
      log.info('bcNodes: ' + JSON.stringify(bcNodes))
      ctx.response.body = bcNodes
      ctx.status = 200
    } catch (error) {
      ctx.status = 400
      ctx.response.body = error
    }
  }

  async getELNodes (ctx: Router.IRouterContext) {
    log.info('GET EL NODES! ')
    try {
      const elNodes = await this.sqlAll('SELECT ethereumAddress, nodeId FROM el_node')
      log.info('elNodes: ' + JSON.stringify(elNodes))
      ctx.response.body = elNodes
      ctx.status = 200
    } catch (error) {
      ctx.status = 400
      ctx.response.body = error
    }
  }

  sqlRun (query: string, params?: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.database.run(query, params, error => {
        error ? reject(error) : resolve()
      })
    })
  }

  sqlAll <A> (query: string, params?: any): Promise<Array<A>> {
    return new Promise<Array<A>>((resolve, reject) => {
      this.database.all(query, params, (error, rows) => {
        error ? reject(error) : resolve(rows)
      })
    })
  }
}
