// src/infra/persistence/typeorm/repositories/EventRepository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/database';
import { Event } from '../../../../domain/entities/event';
import { injectable } from 'tsyringe';

@injectable()
export class EventRepository {
  private repository: Repository<Event>;

  constructor() {
    // Obtém o repositório da entidade Event a partir do DataSource configurado.
    this.repository = AppDataSource.getRepository(Event);
  }

  /**
   * Salva um novo evento ou atualiza um existente.
   * @param event A entidade Event a ser salva.
   * @returns A entidade Event persistida.
   */
  async save(event: Event): Promise<Event> {
    return await this.repository.save(event);
  }

  /**
   * Retorna todos os eventos.
   * @returns Array de eventos.
   */
  async getAllEvents(): Promise<Event[]> {
    return await this.repository.find();
  }

  /**
   * Retorna um evento específico pelo ID.
   * @param id ID do evento.
   * @returns O evento encontrado ou null, se não existir.
   */
  async getEventById(id: string): Promise<Event | null> {
    return await this.repository.findOneBy({ id });
  }

  /**
   * Atualiza um evento com os dados fornecidos.
   * @param id ID do evento a ser atualizado.
   * @param updateData Dados parciais para atualizar o evento.
   * @returns O evento atualizado ou null se não for encontrado.
   */
  async updateEvent(id: string, updateData: Partial<Event>): Promise<Event | null> {
    const event = await this.repository.findOneBy({ id });
    if (!event) return null;
    this.repository.merge(event, updateData);
    return await this.repository.save(event);
  }

  /**
   * Deleta um evento pelo ID.
   * @param id ID do evento a ser deletado.
   * @returns True se a exclusão foi bem-sucedida, false caso contrário.
   */
  async deleteEvent(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected !== undefined;
  }
}
