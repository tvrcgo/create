'use strict';

const path = require('path')
const egg = require('egg')
const EGG_PATH = Symbol.for('egg#eggPath')
const { AppWorkerLoader } = require('./loader')

class CustomApplication extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname)
  }

  get [Symbol.for('egg#loader')]() {
    return AppWorkerLoader
  }
}

module.exports = CustomApplication
