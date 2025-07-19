import { Injectable } from '@nestjs/common'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'

@Injectable()
export class HomeService {
  constructor(
    @InjectPinoLogger(HomeService.name)
    private readonly logger: PinoLogger
  ) {}

  getHello(): string {
    this.logger.info('getHello service')
    return 'Hello World!'
  }
}
