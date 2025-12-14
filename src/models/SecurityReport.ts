import { EntropyResult, CrackTimeResult, RiskAnalysisResult } from "../types";
import { AnalysisTarget } from "./AnalysisTarget";
import { OutputFormatter } from "../cli/OutputFormatter";

/**
 * SecurityReport
 *
 * Aggregates all analysis data for a specific target.
 * Responsible for holding the state of a completed analysis session.
 */
export class SecurityReport {
  public readonly timestamp: Date;

  constructor(
    public readonly target: AnalysisTarget,
    public readonly entropy: EntropyResult,
    public readonly crackTime: CrackTimeResult,
    public readonly risk: RiskAnalysisResult
  ) {
    this.timestamp = new Date();
  }

  /**
   * Converts the report class instance back to the simple JSON interface
   * supported by the legacy OutputFormatter.
   *
   * @deprecated Use dedicated serializers in the future.
   */
  public toLegacyReport() {
    return {
      target: this.target.raw,
      timestamp: this.timestamp.toISOString(),
      entropy: this.entropy,
      crackTime: this.crackTime,
      risk: this.risk,
    };
  }

  public toJSON(): string {
    return JSON.stringify(this.toLegacyReport(), null, 2);
  }
}
