import crypto from "crypto";

export class CryptoTools {
  public hash(input: string, algorithm: string = "sha256"): string {
    try {
      return crypto.createHash(algorithm).update(input).digest("hex");
    } catch (e) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }

  public encode(input: string, format: "base64" | "hex" | "url"): string {
    if (format === "base64") {
      return Buffer.from(input).toString("base64");
    } else if (format === "hex") {
      return Buffer.from(input).toString("hex");
    } else if (format === "url") {
      return encodeURIComponent(input);
    }
    return input;
  }

  public decode(input: string, format: "base64" | "hex" | "url"): string {
    if (format === "base64") {
      return Buffer.from(input, "base64").toString("utf-8");
    } else if (format === "hex") {
      return Buffer.from(input, "hex").toString("utf-8");
    } else if (format === "url") {
      return decodeURIComponent(input);
    }
    return input;
  }
}
