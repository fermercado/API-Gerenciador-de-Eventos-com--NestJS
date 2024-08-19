import { Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/event.dto';
import { EventRepository } from './event.repository';
import { EventValidationService } from './event.validation.service';
import { AuthorizationService } from '../auth/authorization.service';
import { IEvent } from './event.model';
import { PaginationService } from '../utils/pagination.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventValidationService: EventValidationService,
    private readonly authorizationService: AuthorizationService,
    private readonly paginationService: PaginationService,
  ) {}

  async createEvent(data: CreateEventDTO, userId: string): Promise<IEvent> {
    this.authorizationService.verifyUserAuthorization(userId);
    await this.eventValidationService.validateCreateEvent(data);

    const event = await this.eventRepository.create({
      userId,
      ...data,
    });
    return event;
  }

  async deleteEventById(
    eventId: string,
    userId: string,
  ): Promise<IEvent | null> {
    this.authorizationService.verifyUserAuthorization(userId);

    const event = await this.eventRepository.findById(eventId);
    if (event && event.userId === userId) {
      return this.eventRepository.deleteById(eventId);
    }
    return null;
  }

  async deleteEvents(dayOfWeek: string, userId: string): Promise<IEvent[]> {
    this.authorizationService.verifyUserAuthorization(userId);

    const query = { userId, dayOfWeek };
    return this.eventRepository.deleteMany(query);
  }

  async getEvents(query: any, userId: string): Promise<IEvent[]> {
    const conditions: any = { userId };

    if (query.dayOfWeek) {
      conditions.dayOfWeek = query.dayOfWeek;
    }

    if (query.description) {
      conditions.description = { $regex: query.description, $options: 'i' };
    }

    return this.eventRepository.find(conditions);
  }

  async getEventById(eventId: string): Promise<IEvent | null> {
    return this.eventRepository.findById(eventId);
  }
}
