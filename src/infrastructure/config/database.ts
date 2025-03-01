// src/infrastructure/config/database.ts
import 'reflect-metadata';
import mongoose from 'mongoose';

export const connectToMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventos-expresss';
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};
