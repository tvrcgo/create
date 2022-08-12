module.exports = {
  name: 'JS Bundle - umd/typescript',
  enable: true,
  inputs: [
    { name: 'name', message: 'Package name ?' },
    { name: 'moduleName', message: 'Global namespace ?' },
    { name: 'author', message: 'Author ?' },
  ]
}
