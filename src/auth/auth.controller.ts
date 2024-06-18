import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  IGenerateTokenRequest,
  IRefreshTokenRequest,
} from './interfaces/auth.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('UserService', 'GenerateToken')
  generateToken(requestDto: IGenerateTokenRequest) {
    console.log(requestDto);
    console.log('calling generate token');
    return this.authService.generateAccessToken(requestDto);
  }

  @GrpcMethod('UserService', 'RefreshToken')
  refreshToken(requestDto: IRefreshTokenRequest) {
    console.log(requestDto);
    console.log('calling refresh token');
    return this.authService.refreshToken(requestDto);
  }
}
