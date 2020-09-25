
module.exports = appInfo => {

  const config = {}

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    methodnoallow: {
      enable: false
    }
  }

  // 系统日志
  config.logger = {
    consoleLevel: 'DEBUG',
    dir: 'logs/{{name}}'
  }

  // 日志切分（小时）
  config.logrotator = {
    filesRotateByHour: [
      'logs/{{name}}/common-error.log'
    ]
  }

  return config
}
