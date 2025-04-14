// src/confi/server/app.ts
import 'reflect-metadata';
import Fastify from 'fastify';
import { AppDataSource } from '../database';
import 'ignore-punycode-warning';

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    fastify.log.info('Conectado ao MongoDB com TypeORM.');

    const PORT = Number(process.env.PORT) || 3000;
    await fastify.listen({ port: PORT });
    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
