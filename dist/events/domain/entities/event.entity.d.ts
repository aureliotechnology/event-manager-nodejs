import { Document } from 'mongoose';
import { EventModality } from '../enums/event-modality.enum';
export type EventDocument = Event & Document;
export declare class Event {
    uuid: string;
    name: string;
    description: string;
    address: string;
    mapUrl: string;
    date: Date;
    modality: EventModality;
    cancellationPolicy: string;
    participantEditionPolicy: string;
    ticketType: string;
    ticketPrice: number;
    ticketQuantity: number;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
