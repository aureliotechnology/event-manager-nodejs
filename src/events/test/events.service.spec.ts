import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from '../domain/services/events.service';
import { Event } from '../domain/entities/event.entity';
import { CreateEventDto } from '../domain/dto/create-event.dto';
import { UpdateEventDto } from '../domain/dto/update-event.dto';

// Dados de exemplo para o mock
const mockEvent = {
  _id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test Event',
  description: 'Test Description',
  address: 'Test Address',
  mapUrl: 'http://test.com',
  date: new Date(),
  modality: 'presencial', // Se preferir, use: EventModality.PRESENCIAL
  cancellationPolicy: 'No cancellation',
  participantEditionPolicy: 'Not allowed',
  ticketType: 'padrão',
  ticketPrice: 100,
  ticketQuantity: 50,
};

// Cria um mock manual para o model do Mongoose. Aqui forçamos o tipo para "any"
const mockEventModel: any = jest.fn().mockImplementation((dto: any) => ({
  ...dto,
  _id: '123e4567-e89b-12d3-a456-426614174000',
  save: jest
    .fn()
    .mockResolvedValue({ ...dto, _id: '123e4567-e89b-12d3-a456-426614174000' }),
}));

// Adiciona os métodos estáticos esperados
mockEventModel.find = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue([mockEvent]),
});
mockEventModel.findById = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(mockEvent),
});
mockEventModel.findByIdAndUpdate = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(mockEvent),
});
mockEventModel.findByIdAndDelete = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(mockEvent),
});

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          // Forçamos o mockEventModel como "any" para evitar erros de propriedades ausentes
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um novo evento', async () => {
      const createEventDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        address: 'Test Address',
        mapUrl: 'http://test.com',
        date: new Date().toISOString(),
        modality: 'presencial' as any, // Se necessário, faça um cast para contornar o tipo do enum
        cancellationPolicy: 'No cancellation',
        participantEditionPolicy: 'Not allowed',
        ticketType: 'padrão',
        ticketPrice: 100,
        ticketQuantity: 50,
      };

      const result = await service.create(createEventDto);
      expect(result._id).toEqual('123e4567-e89b-12d3-a456-426614174000');
      expect(result.name).toEqual(createEventDto.name);
      expect(mockEventModel).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de eventos', async () => {
      const events = await service.findAll();
      expect(events).toEqual([mockEvent]);
      expect(mockEventModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um evento se encontrado', async () => {
      const event = await service.findOne(
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(event).toEqual(mockEvent);
      expect(mockEventModel.findById).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
    });

    it('deve lançar NotFoundException se o evento não for encontrado', async () => {
      // Simula que findById retorna null
      (mockEventModel.findById as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findOne('nonexistent_id')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar o evento', async () => {
      const updateEventDto: UpdateEventDto = { name: 'Updated Event' };
      const updatedEvent = await service.update(
        '123e4567-e89b-12d3-a456-426614174000',
        updateEventDto,
      );
      expect(updatedEvent).toEqual(mockEvent);
      expect(mockEventModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        updateEventDto,
        { new: true },
      );
    });

    it('deve lançar NotFoundException se o evento não for encontrado para atualização', async () => {
      (mockEventModel.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(
        service.update('nonexistent_id', { name: 'Updated' } as UpdateEventDto),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('deve remover e retornar o evento', async () => {
      const removedEvent = await service.remove(
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(removedEvent).toEqual(mockEvent);
      expect(mockEventModel.findByIdAndDelete).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
    });

    it('deve lançar NotFoundException se o evento não for encontrado para remoção', async () => {
      (mockEventModel.findByIdAndDelete as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.remove('nonexistent_id')).rejects.toThrow();
    });
  });
});
