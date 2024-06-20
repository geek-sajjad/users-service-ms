import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';
import { Observable, of, throwError } from 'rxjs';
import { TetherlandRpcException } from '../errorHandler/tetherland-rpc.exception';

@Catch(TetherlandRpcException)
export class TetherlandRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(
    exception: TetherlandRpcException,
    host: ArgumentsHost,
  ): Observable<any> {
    console.error('TetherlandRpcException:,', exception.getError());
    Sentry.captureException(exception);

    return throwError(() => exception.getError());
  }
}
