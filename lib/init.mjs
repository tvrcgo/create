import { resolve, join, basename, dirname } from 'path'
import fs from 'fs'
import os from 'os'
import rimraf from 'rimraf'
import urllib from 'urllib'
import compressing from 'compressing'
import * as isTextOrBinary from 'istextorbinary'
import glob from 'globby'
import mkdirp from 'mkdirp'
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class Init {
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
    }).filter(v => !['.git'].includes(v))
    if (existFiles && existFiles.length) {
      this._spinner.warn(chalk.yellowBright(`Root is not empty. -> ${existFiles.toString()}`))
    }

    // packages
    // const tarballPkg = await this.downloadPkg(this._pkgInfo.config.boilerplates)
    const pkgsRoot = resolve(__dirname, '../packages')
    const pkgs = glob.sync('*', {
      cwd: pkgsRoot,
      onlyDirectories: true,
      dot: false,
      followSymbolicLinks: false
    }).map(dir => ({
      dir: dir,
      entry: require(resolve(pkgsRoot, `${dir}/index.js`))
    }))

    // boilerplates
    const choices = pkgs
      .filter(pkg => pkg.entry.enable !== false)
      .map(pkg => ({
        name: pkg.entry.name || pkg.dir,
        value: pkg.dir
      }))
    const selectedPkg = await inquirer.prompt({
      type: 'list',
      name: 'dir',
      message: 'Choose template ?',
      choices
    })

    const pkgDir = resolve(pkgsRoot, `${selectedPkg.dir}`)
    const pkgContent = resolve(pkgDir, 'content')
    const pkgEntry = require(resolve(pkgDir, 'index'))

    let inputs = await inquirer.prompt(pkgEntry.inputs)
    if (typeof pkgEntry.filter === 'function') {
      inputs = await pkgEntry.filter(inputs)
    }

    // Create root directory if not exist.
    mkdirp.sync(targetDir)
    // Copy boilerplate files
    this._spinner.start(chalk.yellowBright('Creating files ...'))
    const files = glob.sync('**/*', {
      cwd: pkgContent,
      dot: true,
      onlyFiles: false,
      followSymlinkedDirectories: false,
    })
    files.forEach(file => {
      const from = resolve(pkgContent, file)
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

export default new Init()
