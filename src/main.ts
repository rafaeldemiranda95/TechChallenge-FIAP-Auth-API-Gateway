import * as fs from 'fs';
import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
initializeFirebase(admin);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

export function initializeFirebase(firebase: typeof admin) {
  const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8'));
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}
