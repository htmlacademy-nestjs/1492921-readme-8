import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { RequestIdInterceptor } from '@project/interceptors';
import { BearerAuth, BearerAuthOption } from '@project/shared-core';

import { AppModule } from './app/app.module';
import { API_PORT } from './app/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_PREFIX = 'api';
  const config = new DocumentBuilder()
    .setTitle('Readme App')
    .setDescription('Readme App API')
    .setVersion('1.0')
    .addBearerAuth(BearerAuthOption, BearerAuth.AccessToken)
    .addBearerAuth(BearerAuthOption, BearerAuth.RefreshToken)
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalInterceptors(new RequestIdInterceptor());

  const port = process.env.PORT || API_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
