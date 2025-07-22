import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectPinoLogger(ScheduleService.name)
    private readonly logger: PinoLogger
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  echo() {
    this.logger.info('echo service')
    console.log('echo', Date.now())
  }
}
