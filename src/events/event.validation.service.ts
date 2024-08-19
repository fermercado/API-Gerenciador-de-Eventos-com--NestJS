import { Injectable } from '@nestjs/common';
import { eventValidationSchema } from '../validators/event.validator';
import { ApplicationError } from '../error/application.error';

@Injectable()
export class EventValidationService {
  async validateCreateEvent(data: any): Promise<void> {
    try {
      await eventValidationSchema.validate(data, { abortEarly: false });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        throw new ApplicationError('Validation Error', 400);
      }
      throw error;
    }
  }
}
