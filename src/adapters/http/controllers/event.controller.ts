// src/controllers/EventController.ts
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestError,
  NotFoundError,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { injectable, inject } from 'tsyringe';
import { CreateEventDto } from '../../../domain/dtos/create-event.dto';
import { UpdateEventDto } from '../../../domain/dtos/update-event.dto';
import { EventService } from '../../../domain/service/event.service';
import { Event } from '../../../domain/entities/event.entity';

@injectable()
@JsonController('/events')
export class EventController {
  constructor(@inject(EventService) private eventService: EventService) {}

  @Get('/')
  @OpenAPI({
    summary: 'Retrieve all events',
    description: 'Returns a list of all events.',
  })
  async getAll(): Promise<Event[]> {
    const events = await this.eventService.getAll();
    return events;
  }

  @Get('/:id')
  @OpenAPI({
    summary: 'Retrieve a specific event',
    description: 'Returns an event by its ID.',
  })
  async getOne(@Param('id') id: string): Promise<Event> {
    const event = await this.eventService.getOne(id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    return event;
  }

  @Post('/')
  @OpenAPI({
    summary: 'Create a new event',
    description: 'Creates an event using the provided data.',
    requestBody: {
      content: {
        'application/json': {
          // O schema do CreateEventDto será referenciado na documentação
          schema: { $ref: '#/components/schemas/CreateEventDto' },
        },
      },
    },
    responses: {
      '201': {
        description: 'Event created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EventResponse' },
          },
        },
      },
      '400': { description: 'Validation error' },
    },
  })
  async create(@Body() eventData: any): Promise<Event> {
    // Valida os dados usando o método estático do DTO que integra Joi
    console.log('1', eventData);
    const { error, value } = CreateEventDto.validate(eventData);
    if (error) {
      throw new BadRequestError(
        'Validation failed: ' +
          error.details.map((detail) => detail.message).join(', ')
      );
    }
    console.log('2', eventData);

    const newEvent = await this.eventService.createEvent(value);
    console.log('5', eventData);

    return newEvent;
  }

  @Put('/:id')
  @OpenAPI({
    summary: 'Update an event',
    description: 'Updates an event by its ID using the provided data.',
    requestBody: {
      content: {
        'application/json': {
          // O schema do UpdateEventDto será referenciado na documentação
          schema: { $ref: '#/components/schemas/UpdateEventDto' },
        },
      },
    },
    responses: {
      '200': {
        description: 'Event updated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EventResponse' },
          },
        },
      },
      '400': { description: 'Validation error' },
      '404': { description: 'Event not found' },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateData: any
  ): Promise<Event> {
    // Supondo que o UpdateEventDto também possua um método de validação similar
    const { error, value } = UpdateEventDto.validate(updateData);
    if (error) {
      throw new BadRequestError(
        'Validation failed: ' +
          error.details.map((detail) => detail.message).join(', ')
      );
    }
    const updatedEvent = await this.eventService.update(id, value);
    if (!updatedEvent) {
      throw new NotFoundError('Event not found for update');
    }
    return updatedEvent;
  }

  @Delete('/:id')
  @OpenAPI({
    summary: 'Delete an event',
    description: 'Deletes an event by its ID.',
    responses: {
      '200': { description: 'Event deleted successfully' },
      '404': { description: 'Event not found' },
    },
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deletedEvent = await this.eventService.del(id);
    if (!deletedEvent) {
      throw new NotFoundError('Event not found for deletion');
    }
    return { message: 'Event deleted successfully' };
  }
}
