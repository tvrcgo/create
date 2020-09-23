'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    app.coreLogger.info('[{{name}}] ready')
  })
  app.beforeClose(async () => {
    app.coreLogger.info('[{{name}}] closed')
  })
}
