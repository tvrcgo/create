import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { PingService } from './ping.service'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    PingService,
  ],
})
export class AppModule {}
