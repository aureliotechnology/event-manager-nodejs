// src/domain/dtos/CreateEventDto.ts
import Joi from 'joi';
import { EventModality } from '../enum/event-modality.enum';


export class CreateEventDto {
  name!: string;
  description!: string;
  address!: string;
  mapUrl!: string;
  date!: string;
  modality!: EventModality;
  cancellationPolicy!: string;
  participantEditionPolicy!: string;
  ticketType!: string;
  ticketPrice!: number;
  ticketQuantity!: number;

  // Esquema de validação utilizando Joi
  static schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    mapUrl: Joi.string().uri().required(),
    date: Joi.date().iso().required(),
    modality: Joi.string().valid(...Object.values(EventModality)).required(),
    cancellationPolicy: Joi.string().required(),
    participantEditionPolicy: Joi.string().required(),
    ticketType: Joi.string().required(),
    ticketPrice: Joi.number().min(0).required(),
    ticketQuantity: Joi.number().min(0).required(),
  });

  /**
   * Valida os dados informados de acordo com o esquema definido.
   * @param data - Dados a serem validados.
   * @returns O resultado da validação contendo os valores validados ou erros.
   */
  static validate(data: any) {
    return this.schema.validate(data, { abortEarly: false });
  }
}
