import { EventModality } from '../enums/event-modality.enum';
export declare class CreateEventDto {
    name: string;
    description: string;
    address: string;
    mapUrl: string;
    date: string;
    modality: EventModality;
    cancellationPolicy: string;
    participantEditionPolicy: string;
    ticketType: string;
    ticketPrice: number;
    ticketQuantity: number;
}
