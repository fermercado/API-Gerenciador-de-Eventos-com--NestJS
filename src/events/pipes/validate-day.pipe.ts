import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateDayOfWeekPipe implements PipeTransform {
  transform(value: any) {
    const validDaysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    if (!validDaysOfWeek.includes(value.toLowerCase())) {
      throw new BadRequestException('Invalid day of the week.');
    }

    return value;
  }
}
