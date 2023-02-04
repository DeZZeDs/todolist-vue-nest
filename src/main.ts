import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000
  app.setGlobalPrefix('api')
  console.log('Port running on: ', port)

  const options = new DocumentBuilder()
      .setTitle('Todo APP')
      .setDescription('Todo API documentation')
      .setVersion('1.0')
      .addTag('Todo')
      .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:5173'
    ],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();