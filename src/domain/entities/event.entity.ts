// src/domain/entities/Event.ts
import { Entity,  Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EventModality } from '../enums/event-modality.enum';
import { string } from 'joi';

@Entity('events')
export class Event {
  @Column( {type: 'uuid'})
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  address!: string;

  @Column()
  mapUrl!: string;

  @Column()
  date!: Date;

  @Column()
  modality!: EventModality;

  @Column()
  cancellationPolicy!: string;

  @Column()
  participantEditionPolicy!: string;

  @Column({ default: 'padrão' })
  ticketType!: string;

  @Column('double')
  ticketPrice!: number;

  @Column()
  ticketQuantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Método de negócio de exemplo:
  isSoldOut(): boolean {
    return this.ticketQuantity <= 0;
  }
}
