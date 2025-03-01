// test-save.ts
import 'reflect-metadata';
import mongoose from 'mongoose';
import EventModel from './src/adapters/persistence/mongoose/models/event.model';

async function testSave() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event_manager', {
      serverSelectionTimeoutMS: 30000,
    });
    console.log('Conectado ao MongoDB');

    const newEvent = new EventModel({
      name: 'Teste',
      description: 'Teste de criação',
      address: 'Rua X, 123',
      mapUrl: 'https://maps.google.com/?q=Rua+X,+123',
      date: new Date(),
      modality: 'presencial', // ou o valor correto conforme seu enum
      cancellationPolicy: 'Nenhuma',
      participantEditionPolicy: 'Nenhuma',
      ticketType: 'padrão',
      ticketPrice: 100,
      ticketQuantity: 50,
    });

    const savedDoc = await newEvent.save();
    console.log('Documento salvo:', savedDoc);
    process.exit(0);
  } catch (err) {
    console.error('Erro ao salvar documento:', err);
    process.exit(1);
  }
}

testSave();
