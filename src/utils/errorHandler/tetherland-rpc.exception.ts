import { errorObjectCollection } from './errorObject.collection';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

/**
 * @class
 * use this class for throwing exception in all over server implementation
 * @example throw new TetherlandRpcException("unknown", status.UNKNOWN, "Interval server error");
 */
export class TetherlandRpcException extends RpcException {
  /**
   * @param type english message of exception (you should define it in separate object and add it to {@link errorObjectCollection}  )
   */
  constructor(type: keyof typeof errorObjectCollection) {
    const statusCode = errorObjectCollection[type]['status'] ?? status.UNKNOWN;

    const message =
      errorObjectCollection[type].description ?? 'Internal Server Error';

    const response = {
      details: message,
      code: statusCode,
    };

    super(response);
  }
}
