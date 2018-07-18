import * as Router from 'koa-router'
import { Middleware } from 'koa'

export default class Controller {
  middleware: Middleware
  allowedMethods: Middleware

  constructor () {
    const router = new Router()
    router.post('/bc-nodes', this.addBCNode.bind(this))
    router.post('/el-nodes', this.addELNode.bind(this))
    router.get('/bc-nodes', this.getBCNodes.bind(this))
    router.get('/el-nodes', this.getELNodes.bind(this))

    this.middleware = router.routes()
    this.allowedMethods = router.allowedMethods()
  }

  async addBCNode (ctx: Router.IRouterContext) {
    const body = ctx.request.body
    console.log('ADD BC: This is a body: ' + JSON.stringify(body))
    ctx.status = 200
  }

  async addELNode (ctx: Router.IRouterContext) {
    const body = ctx.request.body
    console.log('ADD EL: This is a body: ' + JSON.stringify(body))
    ctx.status = 200
  }

  async getBCNodes (ctx: Router.IRouterContext) {
    console.log('GET BC NODES! ')
    ctx.status = 200
  }

  async getELNodes (ctx: Router.IRouterContext) {
    console.log('GET EL NODES! ')
    ctx.status = 200
  }
}
