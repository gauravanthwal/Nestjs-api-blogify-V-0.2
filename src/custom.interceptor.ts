import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterCeptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('this is before the request');

    return handler.handle().pipe(
      map((data) => {
        console.log('this is intercepting the response');
        return data;
      }),
    );
  }
}
