import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventModality } from '../enums/event-modality.enum';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsUrl()
  mapUrl: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(EventModality as object, {
    message: 'modality must be one of: presencial, virtual, hibrido',
  })
  modality: EventModality;

  @IsNotEmpty()
  @IsString()
  cancellationPolicy: string;

  @IsNotEmpty()
  @IsString()
  participantEditionPolicy: string;

  @IsNotEmpty()
  @IsString()
  ticketType: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  ticketQuantity: number;
}
