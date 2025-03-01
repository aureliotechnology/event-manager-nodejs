import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from 'src/events/domain/dto/create-event.dto';
import { UpdateEventDto } from 'src/events/domain/dto/update-event.dto';
import { EventsService } from 'src/events/domain/services/events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo evento' })
  @ApiResponse({
    status: 201,
    description: 'O evento foi criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os eventos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista de eventos.',
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um evento pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o evento encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um evento pelo id' })
  @ApiResponse({
    status: 200,
    description: 'O evento foi atualizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos.',
  })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um evento pelo id' })
  @ApiResponse({
    status: 200,
    description: 'O evento foi removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
