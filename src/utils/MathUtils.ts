/**
 * Advanced Mathematical Utilities for Security Analysis.
 * Handles BigInt operations for massive search spaces and precise entropy calcs.
 */
export class MathUtils {
  /**
   * Calculates big integer power: base^exponent
   * Essential for password search space (Pool^Length)
   */
  public static bigPow(base: number, exponent: number): bigint {
    return BigInt(base) ** BigInt(exponent);
  }

  /**
   * Precise floating point rounding.
   */
  public static round(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  /**
   * Human readable format for massive numbers (e.g. 1.2e+24)
   */
  public static formatBigInt(value: bigint): string {
    if (value < BigInt(10000)) return value.toString();

    const str = value.toString();
    const exponent = str.length - 1;
    const mantissa = str.slice(0, 4);
    return `${mantissa[0]}.${mantissa.slice(1)}e+${exponent}`;
  }
}
