
module.exports = appInfo => {
  const config = {}

  config.keys = appInfo.name

  // nunjucks 模板引擎
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  }

  return config
}
