import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  const config = new DocumentBuilder()
    .setTitle('VR Learning API')
    .setDescription('API for auth, tests, and learning log')
    .setVersion('1.0.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      description: 'HttpOnly cookie set by server'
    })
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true, withCredentials: true },
    })

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}
bootstrap();
