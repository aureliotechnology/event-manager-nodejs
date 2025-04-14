// src/infra/config/database.ts
import { DataSource } from 'typeorm';
import { Event } from '../../domain/entities/event';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGO_HOST || 'mongo',
  port: parseInt(process.env.MONGO_PORT || '27017', 10),
  database: process.env.MONGO_DB || 'event_manager',
  synchronize: true,
  logging: false,
  useUnifiedTopology: true,
  entities: [Event],
});
