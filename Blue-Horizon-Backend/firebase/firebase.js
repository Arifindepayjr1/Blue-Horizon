import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read service account JSON
const serviceAccountPath = path.join(__dirname, "../config/firebase-adminsdk.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
