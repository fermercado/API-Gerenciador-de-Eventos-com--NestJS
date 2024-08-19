import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEvent } from './event.model';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<IEvent>,
  ) {}

  async create(data: Partial<IEvent>): Promise<IEvent> {
    return this.eventModel.create(data);
  }

  async findById(eventId: string): Promise<IEvent | null> {
    return this.eventModel.findById(eventId);
  }

  async find(query: any): Promise<IEvent[]> {
    const results = await this.eventModel.find(query).exec();
    return results;
  }

  async deleteById(eventId: string): Promise<IEvent | null> {
    const event = await this.eventModel.findById(eventId);
    if (event) {
      await this.eventModel.deleteOne({ _id: eventId });
    }
    return event;
  }

  async deleteMany(query: any): Promise<IEvent[]> {
    const events = await this.eventModel.find(query);
    if (events.length > 0) {
      await this.eventModel.deleteMany(query);
    }
    return events;
  }
}
