import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Verifica o status da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'A aplicação está funcionando',
    type: String,
  })
  getHello(): string {
    return 'ok';
  }
}
