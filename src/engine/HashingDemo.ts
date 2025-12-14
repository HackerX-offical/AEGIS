import crypto from "crypto";
import { Logger } from "../core/Logger";

export class HashingDemo {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  public demonstrate(input: string): void {
    this.logger.info(`Hashing Demo for input: "${input}"`);

    // 1. Weak Hash (MD5) - Educational warning
    const md5 = crypto.createHash("md5").update(input).digest("hex");
    console.log(`\nTYPE: MD5 (Unsafe/Obsolete)`);
    console.log(`Hash: ${md5}`);
    console.log(`Note: Fast generation makes it vulnerable to brute-force.`);

    // 2. SHA-256 (Common Standard)
    const sha256 = crypto.createHash("sha256").update(input).digest("hex");
    console.log(`\nTYPE: SHA-256 (Standard)`);
    console.log(`Hash: ${sha256}`);
    console.log(`Note: Determinisic. Same input always = same output.`);

    // 3. Salting Demo
    const salt = crypto.randomBytes(16).toString("hex");
    const saltedInput = input + salt;
    const saltedSha256 = crypto
      .createHash("sha256")
      .update(saltedInput)
      .digest("hex");
    console.log(`\nTYPE: SHA-256 + SALT`);
    console.log(`Salt: ${salt}`);
    console.log(`Hash: ${saltedSha256}`);
    console.log(`Note: Salt prevents pre-computed rainbow table attacks.`);

    // 4. PBKDF2 (Slow implementation)
    const start = Date.now();
    const pbkdf2 = crypto
      .pbkdf2Sync(input, salt, 100000, 64, "sha512")
      .toString("hex");
    const end = Date.now();
    console.log(`\nTYPE: PBKDF2 (Adaptive/Slow)`);
    console.log(`Hash: ${pbkdf2.substring(0, 40)}...`);
    console.log(`Time: ${end - start}ms`);
    console.log(`Note: Work factor (iterations) slows down attackers.`);
  }
}
