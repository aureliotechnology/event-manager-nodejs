// src/repositories/EventRepository.ts
import {  Repository } from 'typeorm';
import { Event } from '../../../../domain/entities/event.entity';
import { injectable } from 'tsyringe';

@injectable()
export class EventRepository extends Repository<Event>{


  /**
   * Retorna todos os eventos armazenados.
   * @returns Um array com todas as entidades de Event.
   */
  async getAllEvents(): Promise<Event[]> {
    return await this.find();
  }

  /**
   * Retorna um evento específico pelo ID.
   * @param id O ID do evento.
   * @returns A entidade Event ou null se não encontrada.
   */
  async getEventById(id: string): Promise<Event | null> {
    return await this.findOne({ where: {
      id: id
    } });
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
   * @param id O ID do evento a ser deletado.
   * @returns True se a exclusão foi bem-sucedida, false caso contrário.
   */
  async deleteEvent(id: string): Promise<boolean> {
    const result = await this.delete({ id: id });
    return result.affected !== undefined;
  }
}
