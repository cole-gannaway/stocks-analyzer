import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import * as firebaseWebConfig from '../config/firebase.config.json';

const firebaseConfig = {
  apiKey: firebaseWebConfig.apiKey,
  authDomain: firebaseWebConfig.authDomain,
  databaseURL: firebaseWebConfig.databaseURL,
  storageBucket: firebaseWebConfig.storageBucket,
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

export interface CryptoDictionary {
  [symbol: string]: number;
}
