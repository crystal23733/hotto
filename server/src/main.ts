import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3001;
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, PATCH, HEAD, DELETE', 
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use(morgan('dev'));
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();
