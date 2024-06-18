import { status } from '@grpc/grpc-js';

export const AuthErrorObject = {
  invalidLoginCredentials: {
    description: 'email or password is not correct',
    status: status.UNAUTHENTICATED,
    type: 'invalidLoginCredentials',
  },
};
