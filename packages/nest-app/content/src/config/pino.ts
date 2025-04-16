import { join } from 'path'
import * as dayjs from 'dayjs'
import config from './config.default'

const isProd = process.env.NODE_ENV === 'production'
const logRoot = join(process.cwd(), 'logs/')
export const pinoConfig = {
  pinoHttp: {
    level: isProd ? 'info' : 'debug',
    name: config.name,
    autoLogging: false,
    mixin: () => {
      return {}
    },
    timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
    serializers: {
      req: () => undefined,
      res: () => undefined,
      err: (error) => error.stack,
    },
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname,name,context',
          },
        },
        {
          target: 'pino/file',
          level: 'error',
          options: {
            destination: join(logRoot, 'error.log'),
            mkdir: true,
          },
        },
        {
          target: 'pino-rotate',
          options: {
            file: join(logRoot, 'app-%YYYY-MM-DD%.log'),
            limit: '30d',
            json: false,
          },
        },
      ],
    },
  },
}
