import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule)
}

bootstrap().catch((error) => {
  console.error(error)
})

process.on('unhandledRejection', (reason) => {
  console.error('unhandled promise reject:', reason)
})
