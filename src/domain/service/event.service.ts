// src/domain/service/EventService.ts

import { injectable, inject } from "tsyringe";
import { EventRepository } from "../../adapters/persistence/mongoose/models/event.repository";
import { Event } from "../entities/event.entity";

@injectable()
export class EventService  {

  constructor(
    @inject(EventRepository) private repo: EventRepository
  ) {}

  async createEvent(value: any) {
    const entity = new Event();
    entity.name = value.name;
    entity.description = value.description;
    entity.address = value.address;
    entity.mapUrl = value.mapUrl;
    entity.date = value.date;
    entity.modality = value.modality;
    entity.cancellationPolicy = value.cancellationPolicy;
    entity.participantEditionPolicy = value.participantEditionPolicy;
    entity.ticketType = value.ticketType;
    entity.ticketPrice = value.ticketPrice;
    entity.ticketQuantity = value.ticketQuantity;
    return this.repo.save(entity);
  }

  async getAll() {
    return this.repo.getAllEvents();
  }

  async getOne(id: string): Promise<Event | null>  {
    return this.repo.getEventById(id);
  }

  async update(id:string, value: any) {
    return this.repo.updateEvent(id, value)
  }

  async del(id: string) {
    return this.repo.delete(id);
  }

}
