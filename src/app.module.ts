import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { environmentSchema } from './utils/types/config.type';
import { AuthModule } from './auth/auth.module';
import { RpcExceptionToHttpExceptionFilter } from './utils/exceptionFilter/rpcExceptionFilter';

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

  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: RpcExceptionToHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
