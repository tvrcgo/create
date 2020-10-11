const less = require('@remax/plugin-less')

module.exports = {
  plugins: [
    less({
      lessOptions: {
        globalVars: {
          'primary-color': '#1b73fa'
        }
      }
    })
  ]
}
