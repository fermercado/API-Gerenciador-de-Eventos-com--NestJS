import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDayOfWeekPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value.dayOfWeek !== 'string') {
      throw new BadRequestException('Day of the week must be a string.');
    }

    const validDaysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    if (!validDaysOfWeek.includes(value.dayOfWeek.toLowerCase())) {
      throw new BadRequestException('Invalid day of the week.');
    }

    return value;
  }
}
