/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EventModality } from '../enums/event-modality.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  // Nome do evento
  @Prop({ required: true, trim: true })
  name: string;

  // Descrição contendo regras e informações sobre bar
  @Prop({ required: true, trim: true })
  description: string;

  // Endereço para o evento
  @Prop({ required: true, trim: true })
  address: string;

  // Link para o mapa com o endereço do evento
  @Prop({ required: true, trim: true })
  mapUrl: string;

  // Data em que o evento será realizado
  @Prop({ required: true })
  date: Date;

  // Modalidade do evento: presencial, virtual ou híbrido
  @Prop({ required: true, enum: EventModality })
  modality: EventModality;

  // Política de cancelamento
  @Prop({ required: true, trim: true })
  cancellationPolicy: string;

  // Política de edição do participante (troca de titular do ingresso)
  @Prop({ required: true, trim: true })
  participantEditionPolicy: string;

  // Tipo de ingresso (inicialmente somente "padrão")
  @Prop({ required: true, default: 'padrão', trim: true })
  ticketType: string;

  // Valor do ingresso (único)
  @Prop({ required: true })
  ticketPrice: number;

  // Quantidade de ingressos disponíveis
  @Prop({ required: true })
  ticketQuantity: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Configuração para que o JSON retornado contenha um campo 'id' e não exiba '_id' e '__v'
EventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    _doc.id = ret.id;
    _doc._id = ret._id;
  },
});
