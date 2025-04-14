// src/routes/example.route.ts
import { FastifyInstance } from 'fastify';

export async function exampleRoutes(fastify: FastifyInstance) {
  fastify.get('/example', async (request, reply) => {
    return { message: 'Rota exemplo funcionando!' };
  });
}
