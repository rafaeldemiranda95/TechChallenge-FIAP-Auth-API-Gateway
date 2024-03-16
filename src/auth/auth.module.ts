import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { FirestoreModule } from '../firestore/firestore.module'; // Importe o FirestoreModule

@Module({
    imports: [PassportModule, FirestoreModule], // Adicione FirestoreModule aos imports
    providers: [GoogleStrategy],
})
export class AuthModule { }
