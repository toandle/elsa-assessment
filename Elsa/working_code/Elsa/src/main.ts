import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';
import { ExceptionsFilter } from './exceptions/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformResponseInterceptor } from './interceptors/transfrom-response.interceptor';
config();

async function bootstrap() {
  const port = process.env.PORT || 8080;

  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new ExceptionsFilter(app.get(Logger)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor())

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Elsa Essessment Service')
      .setDescription('The Elsa Assessment API documenttation')
      .setVersion('1.0.3')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/v1/elsa-assessment/swagger', app, document);
  }

  await app.listen(port);
  console.log('Server is listening at', port);
}

bootstrap();
