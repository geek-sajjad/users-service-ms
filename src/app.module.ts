import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { environmentSchema } from './utils/types/config.type';
import { AuthModule } from './auth/auth.module';
import { TetherlandRpcExceptionFilter } from './utils/exceptionFilter/tetherland-rpc-exception.filter';
import { AllExceptionFilter } from './utils/exceptionFilter/all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<environmentSchema>({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URI: Joi.string(),
      }),
    }),

    PrismaModule,

    HealthModule,
    AuthModule,
  ],

  // Note: The order of exception filters registered here is important
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TetherlandRpcExceptionFilter,
    },
  ],
})
export class AppModule {}
