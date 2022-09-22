module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [
    ["module-resolver", {
      root: ["."],
      alias: {
        "@": "./src"
      }
    }]
  ]
}
