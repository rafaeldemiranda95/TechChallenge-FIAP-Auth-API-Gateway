import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { FirestoreModule } from '../firestore/firestore.module';

@Module({
    imports: [PassportModule, FirestoreModule],
    providers: [GoogleStrategy],
})
export class AuthModule { }
