
module.exports = app => {
  return class HomeController extends app.Controller {
    async home() {
      const res = await this.ctx.service.hsf.invoke()
      this.ctx.body = 'nice, ' + res
    }

    async client() {
      const manifest = require('../public/asset-manifest.json')
      await this.ctx.render('umi.nj', {
        title: 'App',
        css: [manifest['umi.css']],
        js: [manifest['umi.js']]
      })
    }
  }
}
