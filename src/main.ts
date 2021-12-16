import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configBuilder = new DocumentBuilder()
    .setTitle('Library')
    .setDescription('The Library API')
    .setVersion('1.0')
    .addTag('library')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configBuilder);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
