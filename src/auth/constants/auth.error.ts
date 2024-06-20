import { status } from '@grpc/grpc-js';

export const authErrorObject = {
  invalidLoginCredentials: {
    description: 'email or password is not correct',
    status: status.UNAUTHENTICATED,
    type: 'invalidLoginCredentials',
  },
};
