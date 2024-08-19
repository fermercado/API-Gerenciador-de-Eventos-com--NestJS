import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { userValidationSchema } from '../../validators/user.validator';

@Injectable()
export class ValidateUserCreationPipe implements PipeTransform {
  async transform(value: any) {
    try {
      await userValidationSchema.validate(value, { abortEarly: false });
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
