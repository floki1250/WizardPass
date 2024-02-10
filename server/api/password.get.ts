import * as fs from "fs";
import * as crypto from "crypto";
export default defineEventHandler((event) => {
  function decryptPassword(encryptedPassword: string): string {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      encryptionKey,
      Buffer.from([])
    );
    let decryptedPassword: string = decipher.update(
      encryptedPassword,
      "hex",
      "utf-8"
    );
    decryptedPassword += decipher.final("utf-8");
    return decryptedPassword;
  }

  // Read the encrypted password from the file
  const storedEncryptedPassword: string = fs.readFileSync(
    "passwords.json",
    "utf-8"
  );

  // Decrypt the stored password
  const storedDecryptedPassword: string = decryptPassword(
    storedEncryptedPassword
  );

  console.log(`Original Password: ${userPassword}`);
  console.log(`Encrypted Password: ${encryptedPassword}`);
  console.log(`Decrypted Password: ${storedDecryptedPassword}`);

  return "Hello password";
});
