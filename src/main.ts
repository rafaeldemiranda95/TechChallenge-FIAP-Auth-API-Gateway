import * as fs from 'fs';
import * as admin from 'firebase-admin'; // Importar o módulo firebase-admin
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { initializeFirebase } from './firebase.config';

dotenv.config();
initializeFirebase(admin); // Passar o módulo firebase-admin para a função initializeFirebase

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

export function initializeFirebase(firebase: typeof admin) {
  const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8'));
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
