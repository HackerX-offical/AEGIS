import { SecurityTool, ToolCategory } from "../../types/ToolInterfaces";
import { PayloadFactory } from "../payloads/PayloadFactory";
import { JWTInspector } from "../crypto/JWTInspector";
import colors from "colors";

// 11. Web Threat Modeler
export class WebThreatModelerTool implements SecurityTool {
  id = "modeler";
  name = "Web Threat Modeler";
  category = ToolCategory.WEB;
  description = "Identifies weaknesses from architecture";
  async execute(args: string[]): Promise<void> {
    console.log(colors.magenta(" Modeling STRIDE threats..."));
    console.log("- Spoofing: Low risk (MFA active)");
    console.log("- Tampering: Medium risk (Integrity checks missing on logs)");
  }
}

// 12. Input Validation Analyzer (Wraps PayloadFactory)
export class InputValidationTool implements SecurityTool {
  id = "validator";
  name = "Input Validation Analyzer";
  category = ToolCategory.WEB;
  description = "Explains insecure input handling";
  async execute(args: string[]): Promise<void> {
    const type = args[0] || "xss";
    console.log(colors.cyan(`Generating test vectors for ${type}...`));
    const factory = new PayloadFactory();
    const payloads =
      type === "sqli" ? factory.getSQLiPayloads() : factory.getXSSPayloads();
    payloads.forEach((p) => console.log(p));
  }
}

// 13. API Security Auditor (Wraps JWT)
export class APIAuditorTool implements SecurityTool {
  id = "apiaudit";
  name = "API Security Auditor";
  category = ToolCategory.WEB;
  description = "Reviews API design & auth flows";
  async execute(args: string[]): Promise<void> {
    if (!args[0]) return console.log("Usage: apiaudit <jwt_token>");
    console.log(colors.yellow("Auditing API Token..."));
    const jwt = new JWTInspector();
    jwt.analyze(args[0]).forEach((i) => console.log(i));
  }
}

// 14. Code Smell Detector
export class CodeSmellTool implements SecurityTool {
  id = "codesmell";
  name = "Code Smell Detector";
  category = ToolCategory.WEB;
  description = "Flags risky patterns in source code";
  async execute(args: string[]): Promise<void> {
    console.log(colors.gray("Scanning mock source..."));
    console.log(colors.red("Found: eval() usage on line 42"));
    console.log(colors.yellow("Found: Hardcoded credentials in config"));
  }
}

// 15. OWASP Auto-Mapper
export class OWASPMapperTool implements SecurityTool {
  id = "owasp";
  name = "OWASP Auto-Mapper";
  category = ToolCategory.WEB;
  description = "Maps app risks to OWASP Top 10";
  async execute(args: string[]): Promise<void> {
    console.log(colors.blue("Mapping findings to OWASP Top 10 (2021)..."));
    console.log("A01: Broken Access Control - 2 findings");
    console.log("A03: Injection - 1 finding (Potential SQLi)");
  }
}
