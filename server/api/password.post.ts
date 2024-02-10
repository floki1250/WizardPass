import * as fs from "fs";
import * as crypto from "crypto";
export default defineEventHandler(async (event) => {
  // Encryption key (keep this secret)
  const body = await readBody(event);
  const encryptionKey: string = "test";
  const username: string = null || body.username;
  const userPassword: string = null || body.password;
  const encryptedPassword: string = encryptPassword(userPassword);
  // Function to encrypt a password
  function encryptPassword(password: string): string {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      encryptionKey,
      "1234567890123456"
    );
    let encryptedPassword: string = cipher.update(password, "utf-8", "hex");
    encryptedPassword += cipher.final("hex");
    return encryptedPassword;
  }

  // Save the encrypted password to a file
  fs.writeFileSync("passwords.txt", encryptedPassword, "utf-8");

  console.log(`Original Password: ${userPassword}`);
  console.log(`Encrypted Password: ${encryptedPassword}`);

  return "200 OK";
});
