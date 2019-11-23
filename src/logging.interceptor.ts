import { logger }                                                     from '@micro/common/dist/src';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable }                                                 from 'rxjs';
import { tap }                                                        from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Controller method
    const handler = context.getHandler().name;

    logger.info({ handler, status: 'start' });

    const now = Date.now();
    // Log execution time
    return next.handle()
               .pipe(
                 tap(() => logger.info({
                   message:       { handler, status: 'finish' },
                   executionTime: `${Date.now() - now}ms`,
                 })));
  }
}
