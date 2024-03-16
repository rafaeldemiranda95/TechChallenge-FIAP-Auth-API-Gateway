// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirestoreService } from '../firestore/firestore.service';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(private firestoreService: FirestoreService) { }

    async register(registerDto: any): Promise<any> {
        const userRecord = await admin.auth().createUser({
            email: registerDto.email,
            password: registerDto.password,
        });

        const user = new User(userRecord.uid, registerDto.email, registerDto.firstName, registerDto.lastName);
        await this.firestoreService.createUser(user);

        // Retorna os detalhes do usuário registrado
        return {
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
        };
    }

    async login(loginDto: any): Promise<any> {
        try {
            const user = await admin.auth().getUserByEmail(loginDto.email);
            const token = await admin.auth().createCustomToken(user.uid);

            // Retorna o token para o cliente. O cliente pode usar este token para autenticar com o Firebase diretamente.
            return { token };
        } catch (error) {
            throw new Error('Login falhou: ' + error.message);
        }
    }
}
