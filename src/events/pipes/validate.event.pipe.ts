import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { eventValidationSchema } from '../../validators/event.validator';

@Injectable()
export class ValidateEventPipe implements PipeTransform {
  async transform(value: any) {
    try {
      await eventValidationSchema.validate(value, { abortEarly: false });
      return value;
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(
          error.inner.map((err: any) => ({
            field: err.path,
            message: err.message,
          })),
        );
      }
      throw new BadRequestException('Validation Error');
    }
  }
}
