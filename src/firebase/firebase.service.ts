// import { Injectable } from '@nestjs/common';
// import { Firestore } from '@google-cloud/firestore';

// const config = process.env;

// @Injectable()
// export class FirebaseService {
//   private firestore: Firestore;

//   constructor() {
//     console.log(config.FIRETORE_PROJECT_ID)
//     console.log(config.FIRETORE_SERVICE_ACCOUNT_KEY_FILE_NAME)
//     this.firestore = new Firestore({
//       projectId: config.FIRETORE_PROJECT_ID,
//       keyFilename: config.FIRETORE_SERVICE_ACCOUNT_KEY_FILE_NAME,
//     });
//   }

//   getFirestore() {
//     return this.firestore;
//   }
// }
