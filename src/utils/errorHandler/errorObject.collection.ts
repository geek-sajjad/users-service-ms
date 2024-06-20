import { authErrorObject } from '@/auth/constants/auth.error';
import { status } from '@grpc/grpc-js';

/**
 * @constant
 * an error object to define general errors for example unknown error and etc
 * do not add module error object to it
 */
export const generalErrorObject = {
  unknown: {
    description: 'Internal Server Error',
    status: status.UNKNOWN,
    type: 'unknown',
  },
};

/**
 * @constant
 * you should register own error object into this object
 * @note use spread operator to add own object
 */
export const errorObjectCollection = {
  ...generalErrorObject,
  ...authErrorObject,
};
