import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { updateUserValidationSchema } from '../../validators/update-user.validator';

@Injectable()
export class ValidateUserUpdatePipe implements PipeTransform {
  async transform(value: any) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      return value;
    }

    try {
      await updateUserValidationSchema.validate(value, {
        abortEarly: false,
        stripUnknown: true,
      });
      return value;
    } catch (error: any) {
      console.error('Erros de validação:', error.errors);
      throw new BadRequestException(
        error.inner.map((err: any) => ({
          field: err.path,
          message: err.message,
        })),
      );
    }
  }
}
