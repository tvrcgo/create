
module.exports = app => {
  return class HomeController extends app.Controller {
    async home() {
      const res = await this.ctx.service.hsf.invoke()
      this.ctx.body = 'nice, ' + res
    }
  }
}
