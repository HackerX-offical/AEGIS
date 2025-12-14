import axios from "axios";
import { Logger } from "../core/Logger";

export interface NetworkReport {
  url: string;
  status: number;
  headers: Record<string, string>;
  securityHeaders: {
    hsts: boolean;
    csp: boolean;
    xFrame: boolean;
    xContentType: boolean;
    referrerPolicy: boolean;
  };
  riskLevel: "SAFE" | "MODERATE" | "VULNERABLE";
  recommendations: string[];
}

export class NetworkSafetyEngine {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  public async scan(url: string): Promise<NetworkReport> {
    this.logger.info(`Scanning target: ${url}`);

    // Ensure protocol
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    try {
      const response = await axios.get(url, {
        validateStatus: () => true, // Don't throw on 4xx/5xx
        timeout: 5000,
      });

      const headers = response.headers as Record<string, string>;
      const lowerHeaders = Object.keys(headers).reduce((acc, key) => {
        acc[key.toLowerCase()] = headers[key];
        return acc;
      }, {} as Record<string, string>);

      const securityHeaders = {
        hsts: !!lowerHeaders["strict-transport-security"],
        csp: !!lowerHeaders["content-security-policy"],
        xFrame: !!lowerHeaders["x-frame-options"],
        xContentType: !!lowerHeaders["x-content-type-options"],
        referrerPolicy: !!lowerHeaders["referrer-policy"],
      };

      const missingHeaders = Object.entries(securityHeaders)
        .filter(([_, present]) => !present)
        .map(([key]) => key);

      let riskLevel: NetworkReport["riskLevel"] = "SAFE";
      const recommendations: string[] = [];

      if (missingHeaders.length > 0) {
        if (!securityHeaders.hsts || !securityHeaders.csp) {
          riskLevel = "VULNERABLE";
          recommendations.push("Critical: Missing HSTS or CSP headers.");
        } else {
          riskLevel = "MODERATE";
        }
        recommendations.push(
          `Missing security headers: ${missingHeaders.join(", ")}`
        );
      }

      if (response.status >= 500) {
        recommendations.push(
          "Target server returned 500 error. Check for stability."
        );
      }

      return {
        url,
        status: response.status,
        headers: lowerHeaders,
        securityHeaders,
        riskLevel,
        recommendations,
      };
    } catch (error: any) {
      this.logger.error(`Network scan failed: ${error.message}`);
      throw new Error(`Failed to scan ${url}: ${error.message}`);
    }
  }
}
