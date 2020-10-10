const { resolve, join, basename } = require('path')
const fs = require('fs')
const os = require('os')
const rimraf = require('rimraf')
const urllib = require('urllib')
const compressing = require('compressing')
const isTextOrBinary = require('istextorbinary')
const glob = require('globby')
const mkdirp = require('mkdirp')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

module.exports = class Init {
  constructor() {
    this._pkgInfo = require('../package.json')
    this._httpclient = urllib.create()
    this._spinner = ora('Loading').start()
  }

  async getPkgInfo(pkgName) {
    const res = await this._httpclient.request(`${this._pkgInfo.config.registry}/${pkgName}/latest`, {
      dataType: 'json',
      followRedirect: true,
      timeout: 5000
    })
    return res.data
  }

  async downloadPkg(pkgName) {
    const saveDir = resolve(os.tmpdir(), pkgName)
    await rimraf(saveDir, (err) => err && console.error('[ERROR] rimraf >', err))

    const pkgInfo = await this.getPkgInfo(pkgName)
    if (pkgInfo && pkgInfo.dist) {
      const tgzUrl = pkgInfo.dist.tarball
      const res = await this._httpclient.request(tgzUrl, { streaming: true, followRedirect: true })
      await compressing.tgz.uncompress(res.res, saveDir)
      return join(saveDir, '/package')
    } else {
      return null
    }
  }

  replaceTemplate(content, dict) {
    return content.toString().replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length)
      }
      return dict.hasOwnProperty(key) ? dict[key] : block
    })
  }

  fileMapping(file) {
    const name = basename(file)
    return file.replace(name, ({
      '_package.json': 'package.json',
      '_.gitignore': '.gitignore',
      '_.eslintrc': '.eslintrc',
      '_.eslintignore': '.eslintignore',
      '_.npmignore': '.npmignore'
    })[name] || name)
  }

  async run(argv) {
    const targetDir = resolve(process.cwd(), argv._[0] || '')
    this._spinner.info(`${chalk.bold('Root')} -> ${chalk.cyanBright(targetDir)}`)

    const existFiles = glob.sync('*', {
      cwd: targetDir,
      dot: true,
      onlyFiles: false,
      followSymlinkedDirectories: false
    })
    if (existFiles && existFiles.length) {
      this._spinner.warn(chalk.yellowBright(`Root is not empty. -> ${existFiles.toString()}`))
    }

    const types = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Boilerplate type ?',
      choices: this._pkgInfo.config.types
    })

    const tarballPkg = await this.downloadPkg(this._pkgInfo.config.boilerplates)
    const boilerplateDir = resolve(argv.pkg || tarballPkg || resolve(__dirname, '..'), `packages/${types.type}`)
    const boilerplateContent = resolve(boilerplateDir, 'content')
    const boilerplateEntry = require(resolve(boilerplateDir, 'index'))

    let inputs = await inquirer.prompt(boilerplateEntry.inputs)
    if (typeof boilerplateEntry.resolver === 'function') {
      inputs = await boilerplateEntry.resolver(inputs)
    }

    // Create root directory if not exist.
    mkdirp.sync(targetDir)
    // Copy boilerplate files
    this._spinner.start(chalk.yellowBright('Creating files ...'))
    const files = glob.sync('**/*', {
      cwd: boilerplateContent,
      dot: true,
      onlyFiles: false,
      followSymlinkedDirectories: false,
    })
    files.forEach(file => {
      const from = resolve(boilerplateContent, file)
      const to = resolve(targetDir, this.replaceTemplate(this.fileMapping(file), inputs))

      const stats = fs.lstatSync(from)
      if (stats.isSymbolicLink()) {
        const target = fs.readlinkSync(from)
        fs.symlinkSync(target, to)
      } else if (stats.isDirectory()) {
        mkdirp.sync(to)
      } else if (stats.isFile()) {
        const content = fs.readFileSync(from)
        const result = isTextOrBinary.isText(from, content)
          ? this.replaceTemplate(content.toString('utf8'), inputs)
          : content
        fs.writeFileSync(to, result)
      } else {
        this._spinner.warn('ignore %s，only support file、dir、symlink', file)
      }
    })

    this._spinner.succeed(chalk.green('DONE!'))
  }
}
