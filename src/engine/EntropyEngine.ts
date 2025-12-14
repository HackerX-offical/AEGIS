import { AnalysisTarget } from "../models/AnalysisTarget";
import { MathUtils } from "../utils/MathUtils";
import { EntropyResult } from "../types";
import { Logger } from "../core/Logger";

export class EntropyEngine {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  /**
   * Calculates Shannon Entropy for a given string.
   * Formula: H = -sum(p_i * log2(p_i))
   */
  public calculate(target: AnalysisTarget): EntropyResult {
    const input = target.raw;
    if (!input) {
      return { score: 0, bits: 0, complexity: "Very Weak" };
    }

    const len = input.length;
    const frequencies: Record<string, number> = {};

    // Calculate character frequencies
    for (const char of input) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }

    let entropy = 0;
    for (const char in frequencies) {
      const p = frequencies[char] / len;
      entropy -= p * Math.log2(p);
    }

    // Total bits of entropy = entropy per char * length
    const totalBits = entropy * len;

    this.logger.debug(
      `Entropy calc for length ${len}: ${totalBits.toFixed(2)} bits`
    );

    return {
      score: MathUtils.round(entropy, 4),
      bits: MathUtils.round(totalBits, 2),
      complexity: this.deriveComplexity(totalBits),
    };
  }

  private deriveComplexity(bits: number): EntropyResult["complexity"] {
    if (bits < 28) return "Very Weak";
    if (bits < 36) return "Weak";
    if (bits < 60) return "Moderate";
    if (bits < 128) return "Strong";
    return "Very Strong";
  }
}
