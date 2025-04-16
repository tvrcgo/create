import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeModule } from './home/home.module'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { ScheduleModule } from './schedule/schedule.module'
import { LoggerModule } from 'nestjs-pino'
import config from './config/config.default'
import { pinoConfig } from './config/pino'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    LoggerModule.forRoot(pinoConfig),
    NestScheduleModule.forRoot(),
    ScheduleModule,
    HomeModule,
  ],
  providers: [],
})
export class AppModule {}
