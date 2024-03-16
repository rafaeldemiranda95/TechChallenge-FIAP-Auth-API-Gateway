// firestore.module.ts
import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service'; // Importar o serviço FirestoreService

@Module({
    providers: [FirestoreService], // Adicionar o FirestoreService aos providers
    exports: [FirestoreService], // Exportar o FirestoreService para que ele possa ser injetado em outros módulos
})
export class FirestoreModule { }
