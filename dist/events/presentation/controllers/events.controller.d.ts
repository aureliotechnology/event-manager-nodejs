import { CreateEventDto } from 'src/events/domain/dto/create-event.dto';
import { UpdateEventDto } from 'src/events/domain/dto/update-event.dto';
import { EventsService } from 'src/events/domain/services/events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): CreateEventDto;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEventDto: UpdateEventDto): string;
    remove(id: string): string;
}
