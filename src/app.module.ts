// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';
import { FirestoreService } from './firestore/firestore.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule, FirestoreModule],
  controllers: [AppController, AuthController],
  providers: [AppService, FirestoreService, AuthService],
})
export class AppModule { }
