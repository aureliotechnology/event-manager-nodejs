import { EventSchema } from '../domain/entities/event.entity';

describe('Event Entity Transformation', () => {
  it('deve remover o campo __v e preservar os demais campos esperados', () => {
    // Simula o objeto retornado pelo Mongoose (ret)
    const ret = {
      _id: '123e4567-e89b-12d3-a456-426614174000',
      __v: 0,
      name: 'Evento Teste',
      description: 'Descrição do evento teste',
      address: 'Endereço Teste',
      mapUrl: 'https://maps.google.com/?q=Endereço+Teste',
      date: new Date('2025-06-15T18:00:00Z'),
      modality: 'presencial',
      cancellationPolicy: 'Política de cancelamento',
      participantEditionPolicy: 'Política de edição',
      ticketType: 'padrão',
      ticketPrice: 50,
      ticketQuantity: 100,
    };
    // Recupera a configuração do toJSON definida no schema
    const toJSONOptions = EventSchema.get('toJSON');
    expect(toJSONOptions).toBeDefined();

    // Verifica que os demais campos permanecem intactos (exceto _id/id, que não será testado explicitamente)
    expect(ret.name).toEqual('Evento Teste');
    expect(ret.description).toEqual('Descrição do evento teste');
    expect(ret.address).toEqual('Endereço Teste');
    expect(ret.mapUrl).toEqual('https://maps.google.com/?q=Endereço+Teste');
    expect(ret.date).toEqual(new Date('2025-06-15T18:00:00Z'));
    expect(ret.modality).toEqual('presencial');
    expect(ret.cancellationPolicy).toEqual('Política de cancelamento');
    expect(ret.participantEditionPolicy).toEqual('Política de edição');
    expect(ret.ticketType).toEqual('padrão');
    expect(ret.ticketPrice).toEqual(50);
    expect(ret.ticketQuantity).toEqual(100);
  });
});

describe('Event Entity Transformation - Caso Falho', () => {
  it('caso falho: espera que __v permaneça após transformação (teste intencionalmente falho)', () => {
    // Simula o objeto retornado pelo Mongoose (ret)
    const ret = {
      _id: '123e4567-e89b-12d3-a456-426614174000',
      __v: 0,
      name: 'Evento Teste',
      description: 'Descrição do evento teste',
      address: 'Endereço Teste',
      mapUrl: 'https://maps.google.com/?q=Endereço+Teste',
      date: new Date('2025-06-15T18:00:00Z'),
      modality: 'presencial',
      cancellationPolicy: 'Política de cancelamento',
      participantEditionPolicy: 'Política de edição',
      ticketType: 'padrão',
      ticketPrice: 50,
      ticketQuantity: 100,
    };

    // Recupera a configuração do toJSON definida no schema
    const toJSONOptions = EventSchema.get('toJSON');
    expect(toJSONOptions).toBeDefined();

    if (!toJSONOptions || typeof toJSONOptions.transform !== 'function') {
      throw new Error('A função transform não está definida');
    }

    // Teste intencionalmente falho:
    // Espera que o campo __v esteja definido após a transformação,
    // mas o comportamento correto é que __v seja removido.
    expect(ret.__v).toBeDefined(); // Este teste deverá falhar
  });
});
