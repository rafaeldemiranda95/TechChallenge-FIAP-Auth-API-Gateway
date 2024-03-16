// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module'; // Importar o módulo FirestoreModule
import { FirestoreService } from './firestore/firestore.service'; // Importar o serviço FirestoreService

@Module({
  imports: [AuthModule, FirestoreModule],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
})
export class AppModule { }
