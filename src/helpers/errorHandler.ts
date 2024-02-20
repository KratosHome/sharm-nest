import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export const errorHandler = (func: (...args) => Promise<any>) => args =>
   func(args).catch((err: any) => {
      if (err instanceof Error) {
         throw new BadRequestException(err.message);
      } else {
         throw new InternalServerErrorException(err.message);
      }
   });
