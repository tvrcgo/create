import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'

@Controller()
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    @InjectPinoLogger(HomeController.name)
    private readonly logger: PinoLogger
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('getHello controller')
    return this.homeService.getHello()
  }

  @Get('/home')
  getHome(): string {
    return 'home'
  }
}
