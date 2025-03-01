import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsModule } from 'src/events/events.module';
import { AppController } from 'src/presentation/controllers/health-check.controller';

@Module({
  imports: [
    // Carrega as variáveis de ambiente de um arquivo .env, por exemplo
    ConfigModule.forRoot({ isGlobal: true }),
    // Configura a conexão com o MongoDB usando a variável de ambiente MONGO_URI
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/nestdb',
      {
        // Você pode adicionar opções de conexão aqui, se necessário
      },
    ),
    // Outros módulos da aplicação...
    EventsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
