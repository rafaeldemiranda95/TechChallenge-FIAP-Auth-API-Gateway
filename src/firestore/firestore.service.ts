import { Injectable, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from '../user/user.model';

@Injectable()
export class FirestoreService {
    private db = admin.firestore();

    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp();
        }
    }

    async createUser(user: User): Promise<void> {
        await this.db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
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
    providers: [FirestoreService],
    exports: [FirestoreService],
})
export class FirestoreModule { }
