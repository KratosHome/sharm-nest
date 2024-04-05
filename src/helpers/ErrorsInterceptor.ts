import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof NotFoundException) {
          throw new NotFoundException(err.message);
        }
        if (err instanceof Error) {
          throw new BadRequestException(err.message);
        }

        throw new InternalServerErrorException(err.message);
      }),
    );
  }
}
