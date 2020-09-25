
const egg = require('egg')

const fromLoader = Loader => {
  return class extends Loader {
    loadConfig() {
      super.loadConfig()
      const config = this.app.config
      const logger = this.app.coreLogger
    }
  }
}

const AppWorkerLoader = fromLoader(egg.AppWorkerLoader)
const AgentWorkerLoader = fromLoader(egg.AgentWorkerLoader)

module.exports = {
  AppWorkerLoader,
  AgentWorkerLoader
}
