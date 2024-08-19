import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ValidateDayOfWeekPipe } from './pipes/validate-day.pipe';

@Controller('api/v1/events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createEvent(
    @Body(ValidateDayOfWeekPipe) createEventDto: CreateEventDTO,
    @GetUser() userId: string,
  ) {
    try {
      const event = await this.eventService.createEvent(createEventDto, userId);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Event created successfully',
        event,
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getEvents(
    @GetUser() userId: string,
    @Query('dayOfWeek') dayOfWeek?: string,
    @Query('description') description?: string,
  ) {
    try {
      const query = { dayOfWeek, description };
      const events = await this.eventService.getEvents(query, userId);
      return { statusCode: HttpStatus.OK, events };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getEventById(
    @Param('id') id: string,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() userId: string,
  ) {
    try {
      const event = await this.eventService.getEventById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, event };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteEventById(@Param('id') id: string, @GetUser() userId: string) {
    try {
      const event = await this.eventService.deleteEventById(id, userId);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Event deleted successfully',
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteEvents(
    @Query('dayOfWeek') dayOfWeek: string,
    @GetUser() userId: string,
  ) {
    try {
      const result = await this.eventService.deleteEvents(dayOfWeek, userId);
      if (result.length === 0) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Events deleted successfully',
        result,
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
