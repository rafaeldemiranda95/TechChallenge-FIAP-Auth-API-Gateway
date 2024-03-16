import { Injectable, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from '../user/user.model'; // Ajuste este caminho conforme necessário

@Injectable()
export class FirestoreService {
    private db = admin.firestore();

    constructor() {
        if (!admin.apps.length) { // Verifica se o aplicativo Firebase já foi inicializado
            admin.initializeApp(); // Inicializa o aplicativo Firebase
        }
    }

    async createUser(user: User): Promise<void> {
        await this.db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: admin.firestore.FieldValue.serverTimestamp(), // Ou use user.createdAt se você gerencia a data
        });
    }

    async updateUser(uid: string, userUpdates: Partial<User>): Promise<void> {
        await this.db.collection('users').doc(uid).update({
            ...userUpdates,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
}

@Module({
    providers: [FirestoreService], // Adicionar o FirestoreService aos providers
    exports: [FirestoreService], // Exportar o FirestoreService para que ele possa ser injetado em outros módulos
})
export class FirestoreModule { }
