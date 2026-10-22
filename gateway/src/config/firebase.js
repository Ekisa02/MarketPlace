const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
  const credPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    || path.join(__dirname, '..', '..', '..', 'backend', 'serviceAccountKey.json');

  if (!fs.existsSync(credPath)) {
    console.error(`[gateway] Service account file not found: ${credPath}`);
    console.error('[gateway] Set FIREBASE_SERVICE_ACCOUNT_PATH in gateway/.env');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'));

  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('[gateway] Firebase Admin initialized for project:', serviceAccount.project_id);
}

module.exports = admin;