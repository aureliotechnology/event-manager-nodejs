// src/port/in/http/controller/EventController.ts
import { JsonController, Get, Post, Put, Delete, Body, Param, BadRequestError, NotFoundError } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { injectable, inject } from 'tsyringe';
import { EventService } from '../../../../domain/service/event.service';
import { CreateEventDto } from '../../../../domain/dtos/create.event.dto';
import { UpdateEventDto } from '../../../../domain/dtos/update.event.dto';
import { Event } from '../../../../domain/entities/event';
// Modelo de resposta para a documentação Swagger (exemplo)
export class EventResponse {
  id!: string;
  name!: string;
  description!: string;
  address!: string;
  mapUrl!: string;
  date!: string;
  modality!: string;
  cancellationPolicy!: string;
  participantEditionPolicy!: string;
  ticketType!: string;
  ticketPrice!: number;
  ticketQuantity!: number;
}

@injectable()
@JsonController('/events')
export class EventController {
  constructor(@inject(EventService) private eventService: EventService) {}

  @Get('/')
  @OpenAPI({
    summary: 'Retrieve all events',
    description: 'Returns a list of all events.',
  })
  @ResponseSchema(EventResponse, { isArray: true })
  async getAll(): Promise<Event[]> {
    const events = await this.eventService.getAllEvents();
    return events;
  }

  @Get('/:id')
  @OpenAPI({
    summary: 'Retrieve an event',
    description: 'Returns a specific event by ID.',
  })
  @ResponseSchema(EventResponse)
  async getOne(@Param('id') id: string): Promise<Event> {
    const event = await this.eventService.getEventById(id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    return event;
  }

  @Post('/')
  @OpenAPI({
    summary: 'Create a new event',
    description: 'Creates an event with the provided data.',
    requestBody: {
      content: {
        'application/json': {
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
  @ResponseSchema(EventResponse)
  async create(@Body() eventData: any): Promise<Event> {
    // Validação usando o método estático do DTO que integra Joi (supondo que ele esteja configurado)
    const { error, value } = CreateEventDto.validate(eventData);
    if (error) {
      throw new BadRequestError(
        'Validation failed: ' +
          error.details.map((detail) => detail.message).join(', ')
      );
    }
    const newEvent = await this.eventService.createEvent(value);
    return newEvent;
  }

  @Put('/:id')
  @OpenAPI({
    summary: 'Update an event',
    description: 'Updates an event using the provided data.',
    requestBody: {
      content: {
        'application/json': {
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
  @ResponseSchema(EventResponse)
  async update(@Param('id') id: string, @Body() updateData: any): Promise<Event> {
    const { error, value } = UpdateEventDto.validate(updateData);
    if (error) {
      throw new BadRequestError(
        'Validation failed: ' +
          error.details.map((detail) => detail.message).join(', ')
      );
    }
    const updatedEvent = await this.eventService.updateEvent(id, value);
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
    const deleted = await this.eventService.deleteEvent(id);
    if (!deleted) {
      throw new NotFoundError('Event not found for deletion');
    }
    return { message: 'Event deleted successfully' };
  }
}
