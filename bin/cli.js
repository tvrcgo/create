#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const Cmd = require('../lib/init');

(async () => {
  try {
    await new Cmd().run(argv)
  } catch (error) {
    console.error('lzd-init >', error)
    process.exit(1)
  }
})()
