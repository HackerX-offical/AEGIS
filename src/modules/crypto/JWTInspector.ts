import colors from "colors";

export interface WTFToken {
  header: any;
  payload: any;
  signature: string;
}

export class JWTInspector {
  public decode(token: string): WTFToken | null {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format: Must have 3 parts.");
    }

    try {
      const header = JSON.parse(
        Buffer.from(parts[0], "base64").toString("utf-8")
      );
      const payload = JSON.parse(
        Buffer.from(parts[1], "base64").toString("utf-8")
      );
      const signature = parts[2];
      return { header, payload, signature };
    } catch (e) {
      throw new Error("Failed to decode JWT parts.");
    }
  }

  public analyze(token: string): string[] {
    const issues: string[] = [];
    const decoded = this.decode(token);

    if (!decoded) return ["Invalid Token"];

    // Check for 'None' algo
    if (decoded.header.alg && decoded.header.alg.toLowerCase() === "none") {
      issues.push(
        colors.red("CRITICAL: Algorithm is set to 'none'. Token is insecure.")
      );
    }

    // Check expiration
    if (decoded.payload.exp) {
      const exp = new Date(decoded.payload.exp * 1000);
      if (exp < new Date()) {
        issues.push(colors.yellow(`Token expired at: ${exp.toISOString()}`));
      }
    } else {
      issues.push(
        colors.yellow("Token does not have an expiration (exp) claim.")
      );
    }

    // Sensitive data checks
    const sensitiveKeys = ["password", "secret", "admin", "role"];
    Object.keys(decoded.payload).forEach((key) => {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        issues.push(
          colors.blue(
            `Info: Payload contains sensitive key '${key}'. Ensure this is intended.`
          )
        );
      }
    });

    if (issues.length === 0) {
      issues.push(
        colors.green("No obvious weak configurations found in structure.")
      );
    }

    return issues;
  }
}
