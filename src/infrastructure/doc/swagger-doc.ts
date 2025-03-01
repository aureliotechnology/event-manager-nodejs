// generate-docs.ts
import 'reflect-metadata';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as fs from 'fs';
import * as path from 'path';

// IMPORTANTE: importe os controllers para que seus metadados sejam registrados
import '../../adapters/http/controllers/event.controller';
import '../../adapters/http/controllers/health-check.controller'

const storage = getMetadataArgsStorage();

const spec = routingControllersToSpec(
  storage,
  {}, // Opcional: configurações adicionais para os controllers
  {
    info: {
      title: 'Event Manager API',
      version: '1.0.0',
      description: 'API para gerenciamento de eventos',
    },
  }
);

// Salva o arquivo openapi.json na raiz do projeto (ou em outro caminho desejado)
fs.writeFileSync(
  path.join(__dirname, '../../../', 'openapi.json'),
  JSON.stringify(spec, null, 2)
);
console.log('Documentação OpenAPI gerada com sucesso em openapi.json');
