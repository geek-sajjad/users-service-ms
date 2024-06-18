import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';

@Catch()
export class RpcExceptionToHttpExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: RpcExceptionFilter, host: ArgumentsHost) {
    Sentry.captureException(exception);

    return super.catch(exception, host);
  }
}
