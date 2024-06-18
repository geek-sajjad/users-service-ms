import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { resolve } from 'path';
import * as fs from 'fs';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '15m',
        algorithm: 'RS256',
      },
      privateKey: fs.readFileSync(
        resolve(__dirname, '../../.keys/access-token/private.key'),
      ),
      verifyOptions: {
        algorithms: ['RS256'],
      },
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
