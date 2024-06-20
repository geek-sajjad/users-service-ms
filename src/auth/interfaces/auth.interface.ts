export interface IGenerateTokenRequest {
  email: string;
  password: string;
}

export interface IGenerateTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenRequest {
  userId: number;
}
export interface IRefreshTokenResponse {
  accessToken: string;
}
