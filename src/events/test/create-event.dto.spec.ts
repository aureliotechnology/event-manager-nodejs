import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateEventDto } from '../domain/dto/create-event.dto';
import { EventModality } from '../domain/enums/event-modality.enum';

describe('CreateEventDto', () => {
  it('deve validar um DTO válido', async () => {
    const dto = new CreateEventDto();
    dto.name = 'Concerto de Verão';
    dto.description =
      'Evento com apresentação ao vivo e informações sobre o bar.';
    dto.address = 'Av. Exemplo, 123';
    dto.mapUrl = 'https://maps.google.com/?q=Av+Exemplo,+123';
    dto.date = '2025-06-15T18:00:00Z';
    dto.modality = EventModality.PRESENCIAL;
    dto.cancellationPolicy = 'Cancelamento sem custos até 24h antes do evento.';
    dto.participantEditionPolicy = 'Edição permitida até 12h antes do evento.';
    dto.ticketType = 'padrão';
    dto.ticketPrice = 50;
    dto.ticketQuantity = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve retornar erros quando campos obrigatórios estiverem ausentes', async () => {
    const dto = new CreateEventDto(); // Nenhum campo atribuído
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    // Verifica se alguns campos obrigatórios estão entre os erros
    const propriedadesComErro = errors.map((error) => error.property);
    expect(propriedadesComErro).toContain('name');
    expect(propriedadesComErro).toContain('description');
    expect(propriedadesComErro).toContain('address');
    expect(propriedadesComErro).toContain('mapUrl');
    expect(propriedadesComErro).toContain('date');
    expect(propriedadesComErro).toContain('cancellationPolicy');
    expect(propriedadesComErro).toContain('participantEditionPolicy');
    expect(propriedadesComErro).toContain('ticketPrice');
    expect(propriedadesComErro).toContain('ticketQuantity');
  });

  it('deve retornar erro para um mapUrl inválido', async () => {
    const dto = new CreateEventDto();
    dto.name = 'Evento Teste';
    dto.description = 'Descrição do evento teste';
    dto.address = 'Endereço Teste';
    dto.mapUrl = 'url_invalido';
    dto.date = '2025-06-15T18:00:00Z';
    dto.modality = EventModality.PRESENCIAL;
    dto.cancellationPolicy = 'Política de cancelamento';
    dto.participantEditionPolicy = 'Política de edição';
    dto.ticketType = 'padrão';
    dto.ticketPrice = 50;
    dto.ticketQuantity = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const mapUrlError = errors.find((error) => error.property === 'mapUrl');
    expect(mapUrlError).toBeDefined();
  });

  it('deve retornar erro para um date inválido', async () => {
    const dto = new CreateEventDto();
    dto.name = 'Evento Teste';
    dto.description = 'Descrição do evento teste';
    dto.address = 'Endereço Teste';
    dto.mapUrl = 'https://maps.google.com/?q=Endereço+Teste';
    dto.date = 'data_invalida';
    dto.modality = EventModality.PRESENCIAL;
    dto.cancellationPolicy = 'Política de cancelamento';
    dto.participantEditionPolicy = 'Política de edição';
    dto.ticketType = 'padrão';
    dto.ticketPrice = 50;
    dto.ticketQuantity = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const dateError = errors.find((error) => error.property === 'date');
    expect(dateError).toBeDefined();
  });
});
