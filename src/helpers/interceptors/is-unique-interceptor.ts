import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { catchError, Observable } from 'rxjs';

@Injectable()
export class IsUniqueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.code === '23505') {
          const fieldName = error.detail.split(' ')[1].split('=')[0];

          const normalFieldName = fieldName.slice(1, fieldName.length - 1);

          const fieldValue = error.detail.split('=')[1].match(/\((.*?)\)/)[1];

          throw new ConflictException(
            `Value '${fieldValue}' of field '${normalFieldName}' is already exist`,
          );
        }

        throw error;
      }),
    );
  }
}
