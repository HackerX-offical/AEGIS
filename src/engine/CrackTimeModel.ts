import { CrackTimeResult } from "../types";
import { MathUtils } from "../utils/MathUtils";
import { AnalysisTarget } from "../models/AnalysisTarget";

export class CrackTimeModel {
  // Guesses per second assumptions (Educational Estimates)
  private static readonly RATES = {
    ONLINE_THROTTLED: 100 / 3600, // 100 guesses / hour
    ONLINE_UNTHROTTLED: 100, // 100 guesses / second
    OFFLINE_SLOW_HASH: 10000, // 10k / second (e.g. bcrypt/heavy)
    OFFLINE_FAST_HASH: 10000000000, // 10B / second (e.g. MD5 on GPU)
  };

  public estimate(combinations: bigint): CrackTimeResult {
    // Convert BigInt combinations to number for time estimation (precision loss acceptable for > centuries)
    // But for strict big int math we should try to keep it.
    // For educational purposes, converting to number at the final division step is fine as numbers > 2^53 are "forever" anyway.

    // However, standard Number can go up to 1.7e308.
    // combinations can exceed that for password length > ~150 chars.
    // We will perform the division in Number space for time.

    // Combinations to String -> Number
    const combs = Number(combinations);
    // Note: Infinity handling is implicit in JS numbers.

    return {
      onlineThrottled: this.secondsToHuman(combs / (100 / 3600)),
      onlineUnthrottled: this.secondsToHuman(combs / 100),
      offlineSlowHash: this.secondsToHuman(combs / 10000),
      offlineFastHash: this.secondsToHuman(combs / 10000000000),
      note: `Estimates based on search space of ${MathUtils.formatBigInt(
        combinations
      )} combinations.`,
    };
  }

  private secondsToHuman(seconds: number): string {
    if (!isFinite(seconds)) return "Centuries+ (Infinite)";
    if (seconds < 1) return "Instant";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return "Centuries+";
  }

  public calculateCombinations(target: AnalysisTarget): bigint {
    const poolSize = target.charSetSize;
    if (poolSize === 0) return BigInt(0);

    return MathUtils.bigPow(poolSize, target.length);
  }
}
