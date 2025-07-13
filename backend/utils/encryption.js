// server/utils/encryption.js
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config()

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32-byte key


const ALGORITHM = "aes-256-cbc";

if (!ENCRYPTION_KEY ) {
    console.log(ENCRYPTION_KEY)
    throw new Error("ENCRYPTION_KEY must be set and exactly 32 characters long.");
  }

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
