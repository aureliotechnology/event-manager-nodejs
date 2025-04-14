// src/domain/dtos/UpdateEventDto.ts
import Joi from 'joi';
import { EventModality } from '../enum/event-modality.enum';


export class UpdateEventDto {
  name?: string;
  description?: string;
  address?: string;
  mapUrl?: string;
  date?: string;
  modality?: EventModality;
  cancellationPolicy?: string;
  participantEditionPolicy?: string;
  ticketType?: string;
  ticketPrice?: number;
  ticketQuantity?: number;

  // Esquema de validação para atualização: todos os campos são opcionais, mas exige ao menos um
  static schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    address: Joi.string().optional(),
    mapUrl: Joi.string().uri().optional(),
    date: Joi.date().iso().optional(),
    modality: Joi.string().valid(...Object.values(EventModality)).optional(),
    cancellationPolicy: Joi.string().optional(),
    participantEditionPolicy: Joi.string().optional(),
    ticketType: Joi.string().optional(),
    ticketPrice: Joi.number().min(0).optional(),
    ticketQuantity: Joi.number().min(0).optional(),
  }).min(1);

  /**
   * Valida os dados informados de acordo com o esquema definido.
   * @param data - Dados a serem validados.
   * @returns O resultado da validação contendo os valores validados ou erros.
   */
  static validate(data: any) {
    return this.schema.validate(data, { abortEarly: false });
  }
}
