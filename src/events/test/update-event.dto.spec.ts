import { validate } from 'class-validator';
import { UpdateEventDto } from '../domain/dto/update-event.dto';

describe('UpdateEventDto', () => {
  it('deve validar um DTO de atualização válido sem nenhum campo (campos opcionais)', async () => {
    const dto = new UpdateEventDto();
    // Nenhum campo atribuído deve ser válido, pois todos são opcionais
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve validar um DTO de atualização válido com campos parciais', async () => {
    const dto = new UpdateEventDto();
    dto.name = 'Concerto de Outono';
    dto.mapUrl = 'https://maps.google.com/?q=Av+Exemplo,+123';
    dto.ticketPrice = 80;
    // Se os campos fornecidos forem válidos, não deve haver erros
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve retornar erro para valores inválidos em campos presentes', async () => {
    const dto = new UpdateEventDto();
    // Campos com valores inválidos
    dto.mapUrl = 'url_invalido'; // Valor inválido para URL
    dto.date = 'data_invalida'; // Valor inválido para data (ISO)
    // Mesmo sendo update, se os campos estiverem presentes, devem ser validados
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const mapUrlError = errors.find((error) => error.property === 'mapUrl');
    expect(mapUrlError).toBeDefined();

    const dateError = errors.find((error) => error.property === 'date');
    expect(dateError).toBeDefined();
  });
});
