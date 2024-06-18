import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['user'],
        protoPath: [join(__dirname, '../protos/user.proto')],
      },
    },
  );

  const configService = app.get<ConfigService>(ConfigService);
  Sentry.init({
    dsn: configService.get('SENTRY_DNS'),
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
