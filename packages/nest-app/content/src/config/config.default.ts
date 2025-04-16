import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
  return {
    name: '{{name}}',
  }
})
