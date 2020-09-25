
const egg = require('egg')
const Application = require('./lib/application')
const Agent = require('./lib/agent')
const { AppWorkerLoader, AgentWorkerLoader } = require('./lib/loader')

Object.assign(exports, egg)

exports.Application = Application
exports.Agent = Agent
exports.AppWorkerLoader = AppWorkerLoader
exports.AgentWorkerLoader = AgentWorkerLoader
