export interface EntropyResult {
  score: number;
  bits: number;
  complexity: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";
}

export interface CrackTimeResult {
  onlineThrottled: string;
  onlineUnthrottled: string;
  offlineSlowHash: string;
  offlineFastHash: string;
  note: string;
}

export interface RiskAnalysisResult {
  riskLevel: "Safe" | "Low" | "Medium" | "High" | "Critical";
  detectedPatterns: string[];
  suggestions: string[];
}

export interface FullAnalysisReport {
  target: string;
  timestamp: string;
  entropy: EntropyResult;
  crackTime: CrackTimeResult;
  risk: RiskAnalysisResult;
}
