// src/adapters/http/controllers/HealthCheckController.ts
import 'reflect-metadata';
import { JsonController, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { injectable } from 'tsyringe';

@injectable()
@JsonController('/health-check')
export class HealthCheckController {
  /**
   * Verifica o status da API.
   * @returns Um objeto com o status da API.
   */
  @Get('/')
  @OpenAPI({
    summary: 'Check API status',
    description: 'Returns a simple status check for the API.',
  })
  async check(): Promise<{ status: string }> {
    return { status: 'ok' };
  }
}
