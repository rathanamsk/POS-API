const firebaseAdmin = require('firebase-admin')
const serviceAccount = require('./pos-storage.json')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})

module.exports= () =>{
  return admin.storage().bucket(process.env.STORAGE_BUCKET)
};