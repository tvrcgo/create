#!/usr/bin/env node

import minimist from 'minimist'
import init from './init.mjs'

try {
  const argv = minimist(process.argv.slice(2))
  await init.run(argv)
} catch (error) {
  console.error(error)
  process.exit(1)
}

