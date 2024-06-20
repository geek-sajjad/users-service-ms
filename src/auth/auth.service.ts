import { Injectable } from '@nestjs/common';
import {
  IGenerateTokenRequest,
  IGenerateTokenResponse,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
} from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { resolve } from 'path';
import * as fs from 'fs';
import { UserRepository } from '@/user/user.repository';
import * as bcrypt from 'bcrypt';
import { TetherlandRpcException } from '@/utils/errorHandler/tetherland-rpc.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async generateAccessToken(
    requestDto: IGenerateTokenRequest,
  ): Promise<IGenerateTokenResponse> {
    const user = await this.userRepository.findOneByEmail(requestDto.email);

    if (!user) throw new TetherlandRpcException('invalidLoginCredentials');

    const isPasswordCorrect = await bcrypt.compare(
      requestDto.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new TetherlandRpcException('invalidLoginCredentials');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      token_type: 'access',
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        token_type: 'refresh',
      },
      {
        expiresIn: '30d',
        privateKey: fs.readFileSync(
          resolve(__dirname, '../../.keys/refresh-token/private.key'),
        ),
      },
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(
    requestDto: IRefreshTokenRequest,
  ): Promise<IRefreshTokenResponse> {
    const accessToken = await this.jwtService.signAsync({
      sub: requestDto.userId,
      token_type: 'access',
    });

    return {
      accessToken,
    };
  }
}
