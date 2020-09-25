const mock = require('egg-mock')

describe('test/framework.test.js', () => {
  let app

  before(() => {
    app = mock.app({
      baseDir: 'app',
      framework: true,
    })
    return app.ready()
  })

  after(() => app && app.close())

  afterEach(mock.restore)

})
