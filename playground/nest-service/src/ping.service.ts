import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'

@Injectable()
export class PingService {
  constructor() { }

  @Interval(1000*300)
  ping() {
    console.log('ping', Date.now())
  }
}
