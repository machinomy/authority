import * as Router from 'koa-router'
import Controller from './Controller'

export default class Routes {
  public readonly middleware: Router.IMiddleware
  public readonly allowedMethods: Router.IMiddleware

  constructor (controller: Controller) {
    const router = new Router()
    router.use('/', controller.middleware)
    router.use('/', controller.allowedMethods)

    this.middleware = router.middleware()
    this.allowedMethods = router.allowedMethods()
  }
}
