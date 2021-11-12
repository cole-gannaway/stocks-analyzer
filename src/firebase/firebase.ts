import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import * as firebaseWebConfig from '../config/firebase.config.json';

const firebaseConfig = {
  apiKey: firebaseWebConfig.apiKey,
  authDomain: firebaseWebConfig.authDomain,
  databaseURL: firebaseWebConfig.databaseURL,
  storageBucket: firebaseWebConfig.storageBucket,
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export interface CryptoDictionary {
  [symbol: string]: number;
}

export async function getCryptosPrices(): Promise<CryptoDictionary> {
  let retVal = {};
  console.log('I am running');
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'cryptos'));
    if (snapshot.exists()) {
      retVal = snapshot.val() as CryptoDictionary;
      console.log(snapshot.val());
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }

  return retVal;
}
