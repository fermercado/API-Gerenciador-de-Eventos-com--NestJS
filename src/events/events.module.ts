import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { EventSchema } from './event.model';
import { EventValidationService } from './event.validation.service';
import { AuthorizationService } from '../auth/authorization.service';
import { PaginationService } from '../utils/pagination.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    AuthModule,
  ],
  controllers: [EventController],
  providers: [
    EventService,
    EventRepository,
    EventValidationService,
    AuthorizationService,
    PaginationService,
  ],
})
export class EventModule {}
