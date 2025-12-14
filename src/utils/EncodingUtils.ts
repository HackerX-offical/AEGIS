/**
 * Encoding Utilities for deep inspection of input data.
 * Used to visualize the underlying bytes of a password.
 */
export class EncodingUtils {
  public static toHex(input: string): string {
    return Buffer.from(input).toString("hex");
  }

  public static toBase64(input: string): string {
    return Buffer.from(input).toString("base64");
  }

  public static toBinaryString(input: string): string {
    return input
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(2).padStart(8, "0");
      })
      .join(" ");
  }

  public static getByteLength(input: string): number {
    return Buffer.byteLength(input, "utf8");
  }
}
