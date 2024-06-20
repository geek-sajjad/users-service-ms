import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    Sentry.captureException(exception);
    return throwError(() => exception);
  }
}
