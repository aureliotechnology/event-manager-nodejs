// src/index.ts
import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { container } from 'tsyringe';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import path from 'path';
import cors from 'cors';
import { EventController } from '../adapters/http/controllers/event.controller';
import { HealthCheckController } from '../adapters/http/controllers/health-check.controller';
import mongoose, { createConnection } from 'mongoose';

// Configura o routing-controllers para usar o container do tsyringe
useContainer({
  get: (someClass: any) => container.resolve(someClass),
});

// Cria a aplicação Express com os controllers registrados
const app = createExpressServer({
  controllers: [EventController, HealthCheckController],
});
createConnection();
console.log('Conectado ao MongoDB com TypeORM.');
mongoose.set('debug', true);
 // Registre as rotas; no exemplo, usaremos um controlador simples
app.use(cors());
// Carrega a especificação gerada
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../..', 'openapi.json'), 'utf8')
);

// Servindo o Swagger UI na rota /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/events', EventController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
});
