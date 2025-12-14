import { FullAnalysisReport } from "../types";
import colors from "colors";

export class OutputFormatter {
  public static formatJSON(report: FullAnalysisReport): string {
    return JSON.stringify(report, null, 2);
  }

  public static formatTable(report: FullAnalysisReport): string {
    const { target, entropy, crackTime, risk } = report;

    let output = `\n${colors.cyan(
      "--- HX SECURITY INTELLIGENCE REPORT ---"
    )}\n`;
    output += `Target: ${colors.white(target)}\n`;
    output += `Time:   ${colors.gray(report.timestamp)}\n`;

    output += `\n${colors.yellow("[ PASSWD METRICS ]")}\n`;
    output += `Entropy:    ${entropy.bits.toFixed(2)} bits (${colors.magenta(
      entropy.complexity
    )})\n`;
    output += `Score:      ${entropy.score.toFixed(4)}\n`;

    output += `\n${colors.yellow("[ CRACK TIME MODELS ]")}\n`;
    output += `Online (Throttled):   ${colors.green(
      crackTime.onlineThrottled
    )}\n`;
    output += `Offline (Fast Hash):  ${colors.red(
      crackTime.offlineFastHash
    )}\n`;

    output += `\n${colors.yellow("[ RISK ANALYSIS ]")}\n`;
    output += `Risk Level: ${this.colorRisk(risk.riskLevel)}\n`;
    output += `Patterns:   ${risk.detectedPatterns.join(", ")}\n`;

    if (risk.suggestions.length > 0) {
      output += `\n${colors.blue("[ RECOMMENDATIONS ]")}\n`;
      risk.suggestions.forEach((s) => (output += `* ${s}\n`));
    }

    output += `\n${colors.cyan("---------------------------------------")}\n`;
    return output;
  }

  private static colorRisk(level: string): string {
    switch (level) {
      case "Safe":
        return colors.green(level);
      case "Low":
        return colors.blue(level);
      case "Medium":
        return colors.yellow(level);
      case "High":
        return colors.red(level);
      case "Critical":
        return colors.bgRed.white(level);
      default:
        return level;
    }
  }

  public static formatNetworkReport(report: any): string {
    let output = `\n${colors.cyan("--- NETWORK RECONNAISSANCE REPORT ---")}\n`;
    output += `Target: ${colors.white(report.url)}\n`;
    output += `Status: ${
      report.status === 200
        ? colors.green(report.status.toString())
        : colors.yellow(report.status.toString())
    }\n`;

    output += `\n${colors.yellow("[ SECURITY HEADERS ]")}\n`;
    output += `HSTS:             ${
      report.securityHeaders.hsts
        ? colors.green("Present")
        : colors.red("Missing")
    } \n`;
    output += `CSP:              ${
      report.securityHeaders.csp
        ? colors.green("Present")
        : colors.red("Missing")
    } \n`;
    output += `X-Frame-Options:  ${
      report.securityHeaders.xFrame
        ? colors.green("Present")
        : colors.red("Missing")
    } \n`;
    output += `X-Content-Type:   ${
      report.securityHeaders.xContentType
        ? colors.green("Present")
        : colors.red("Missing")
    } \n`;

    output += `\n${colors.yellow("[ ANALYSIS ]")}\n`;
    output += `Risk Level: ${this.colorRisk(report.riskLevel)}\n`;

    if (report.recommendations.length > 0) {
      output += `\n${colors.blue("[ INTEL & RECOMMENDATIONS ]")}\n`;
      report.recommendations.forEach((rec: string) => (output += `* ${rec}\n`));
    }
    output += `\n${colors.cyan("---------------------------------------")}\n`;
    return output;
  }
}
