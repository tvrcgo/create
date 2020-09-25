'use strict';

const path = require('path')
const egg = require('egg')
const EGG_PATH = Symbol.for('egg#eggPath')
const { AgentWorkerLoader } = require('./loader')

class CustomAgent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname)
  }

  get [Symbol.for('egg#loader')]() {
    return AgentWorkerLoader
  }
}

module.exports = CustomAgent
