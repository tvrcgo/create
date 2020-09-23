
module.exports = {
  inputs: [
    { name: 'name', message: 'Egg plugin name ?' },
    { name: 'desc', message: 'Description ?' },
    { name: 'author', message: 'Author ?' },
  ],
  resolver: async (inputs) => {
    // nameCamel
    if (inputs.name) {
      if (/^(egg|midway)\-/i.test(inputs.name)) {
        inputs.nameCamel = inputs.name.replace(/^(egg|midway)\-/i, '')
      }
      inputs.nameCamel = inputs.nameCamel.replace(/\-([a-z]+)/g, (match, lower) => {
        return lower.split('')[0].toUpperCase() + lower.substring(1)
      })
    }
    return inputs
  }
}
