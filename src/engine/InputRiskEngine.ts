import { RiskAnalysisResult } from "../types";

export class InputRiskEngine {
  public analyze(input: string): RiskAnalysisResult {
    const patterns: string[] = [];
    const suggestions: string[] = [];
    let riskScore = 0;

    // SQL Injection indicators
    if (/'|--|;|OR 1=1|DROP TABLE/i.test(input)) {
      patterns.push("Possible SQL Injection Signature");
      suggestions.push("Avoid using raw SQL quotes or comments in input.");
      riskScore += 3;
    }

    // XSS indicators
    if (/<script|javascript:|onload=|onerror=/i.test(input)) {
      patterns.push("Possible XSS Signature");
      suggestions.push("Input contains HTML/JS executable patterns.");
      riskScore += 3;
    }

    // Path Traversal
    if (/\.\.\/|\.\.\\/i.test(input)) {
      patterns.push("Path Traversal Signature");
      suggestions.push("Input attempts to navigate directory structure.");
      riskScore += 2;
    }

    // Command Injection
    if (/\||&|;|\$\(/i.test(input)) {
      // Context sensitive, but flagging for education
      patterns.push("Possible Command Injection Characters");
      suggestions.push("Special shell characters detected.");
      riskScore += 2;
    }

    return {
      riskLevel: this.getRiskLevel(riskScore),
      detectedPatterns: patterns.length > 0 ? patterns : ["None"],
      suggestions:
        suggestions.length > 0
          ? suggestions
          : ["Input appears syntactically safe (Context dependent)."],
    };
  }

  private getRiskLevel(score: number): RiskAnalysisResult["riskLevel"] {
    if (score === 0) return "Safe";
    if (score < 3) return "Low";
    if (score < 5) return "Medium";
    if (score < 8) return "High";
    return "Critical";
  }
}
