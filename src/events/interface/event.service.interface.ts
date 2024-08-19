import { CreateEventDTO } from '../dto/event.dto';
import { IEvent } from '../event.model';

export interface EventServiceInterface {
  createEvent(data: CreateEventDTO, userId: string): Promise<IEvent>;
  deleteEventById(eventId: string, userId: string): Promise<IEvent | null>;
  deleteEvents(dayOfWeek: string, userId: string): Promise<IEvent[]>;
  getEvents(
    query: Record<string, any>,
    userId: string,
    page: number,
    limit: number,
  ): Promise<IEvent[]>;
  getEventById(eventId: string): Promise<IEvent | null>;
}
