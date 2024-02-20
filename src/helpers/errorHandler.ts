import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const errorHandler =
  (func: (...args) => Promise<any>) =>
  (...args) =>
    func(...args).catch((err: any) => {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException(err.message);
    });
