// import { withdrawalErrorObject } from '@/withdrawal/constants/withdrawal.error';
import { AuthErrorObject } from '@/auth/constants/auth.error';
import { HttpStatus } from '@nestjs/common';

/**
 * @constant
 * an error object to define general errors for example unknown error and etc
 * do not add module error object to it
 */
export const generalErrorObject = {
  unknown: {
    description: 'خطای نا مشخصی رخ داده است.',
    status: HttpStatus.BAD_REQUEST,
    type: 'unknown',
  },
  connectionError: {
    description: 'ارتباط با سرور امکان پذیر نیست.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'connectionError',
  },
};

/**
 * @constant
 * you should register own error object into this object
 * @note use spread operator to add own object
 */
export const errorObjectCollection = {
  ...generalErrorObject,
  ...AuthErrorObject,
};
