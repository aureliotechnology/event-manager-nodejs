// src/domain/service/EventService.ts
import { injectable, inject } from 'tsyringe';
import { Event } from '../entities/event';
import { EventRepository } from '../../infra/persistence/typeorm/repositories/event.repository';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { CreateEventDto } from '../dtos/create.event.dto';
import { UpdateEventDto } from '../dtos/update.event.dto';

@injectable()
export class EventService extends Repository<Event>{

  constructor(
    @inject(EventRepository) private repo: EventRepository,
    entityTarget: EntityTarget<Event>, dataSource: DataSource
  ) {
    super(entityTarget, dataSource.createEntityManager());
  }

  /**
   * Cria um novo evento a partir dos dados do DTO e persiste no banco.
   * @param createDto - Dados para criação do evento.
   * @returns A entidade do evento criado.
   */
  async createEvent(createDto: CreateEventDto): Promise<Event> {
    const entity = new Event();
    entity.name  = createDto.name;
    entity.description  = createDto.description;
    entity.address  = createDto.address;
    entity.mapUrl  = createDto.mapUrl;
    entity.date  = new Date(createDto.date);
    entity.modality  = createDto.modality;
    entity.cancellationPolicy  = createDto.cancellationPolicy;
    entity.participantEditionPolicy  = createDto.participantEditionPolicy;
    entity.ticketType  = createDto.ticketType;
    entity.ticketPrice  = createDto.ticketPrice;
    entity.ticketQuantity  = createDto.ticketQuantity;
    return await this.repo.save(entity);
  }

  /**
   * Retorna todos os eventos.
   */
  async getAllEvents(): Promise<Event[]> {
    return await this.repo.getAllEvents();
  }

  /**
   * Retorna um evento pelo ID.
   * @param id - ID do evento.
   */
  async getEventById(id: string): Promise<Event | null> {
    return await this.repo.getEventById(id);
  }

  /**
   * Atualiza um evento com os dados fornecidos.
   * Mescla os dados existentes com os novos e salva a entidade atualizada.
   * @param id O ID do evento a ser atualizado.
   * @param updateData Dados parciais para atualização.
   * @returns A entidade atualizada ou null se o evento não for encontrado.
   */
  async updateEvent(id: string, updateData: Partial<Event>): Promise<Event | null> {
    const event = await this.findOne({ where: {
      id: id
    } });
    if (!event) {
      return null;
    }
    // Mescla os dados de updateData no objeto event
    this.merge(event, updateData);
    return await this.save(event);
  }

  /**
   * Deleta um evento pelo ID.
   * @param id - ID do evento a ser deletado.
   */
  async deleteEvent(id: string): Promise<boolean> {
    return await this.repo.deleteEvent(id);
  }
}
