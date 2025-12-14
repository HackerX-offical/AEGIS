import { EncodingUtils } from "../utils/EncodingUtils";

/**
 * AnalysisTarget
 *
 * Represents the subject of a security analysis.
 * Encapsulates the raw input and provides efficient access to its properties.
 * Implements internal caching to avoid re-calculating common metrics.
 */
export class AnalysisTarget {
  public readonly raw: string;
  private _charSetSize: number | null = null;
  private _byteLength: number | null = null;
  private _hex: string | null = null;
  private _binary: string | null = null;

  constructor(input: string) {
    this.raw = input;
  }

  public get length(): number {
    return this.raw.length;
  }

  /**
   * Lazily calculates the size of the character pool.
   */
  public get charSetSize(): number {
    if (this._charSetSize !== null) return this._charSetSize;

    let pool = 0;
    if (/[a-z]/.test(this.raw)) pool += 26;
    if (/[A-Z]/.test(this.raw)) pool += 26;
    if (/[0-9]/.test(this.raw)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(this.raw)) pool += 32; // Standard special chars
    // Advanced: Check for extended ascii / unicode? Keeping it simple for now.

    this._charSetSize = pool === 0 ? 0 : pool;
    return this._charSetSize;
  }

  public get byteLength(): number {
    if (this._byteLength === null) {
      this._byteLength = EncodingUtils.getByteLength(this.raw);
    }
    return this._byteLength;
  }

  public get hex(): string {
    if (this._hex === null) {
      this._hex = EncodingUtils.toHex(this.raw);
    }
    return this._hex;
  }

  public get binary(): string {
    if (this._binary === null) {
      this._binary = EncodingUtils.toBinaryString(this.raw);
    }
    return this._binary;
  }

  public toString(): string {
    return this.raw;
  }
}
