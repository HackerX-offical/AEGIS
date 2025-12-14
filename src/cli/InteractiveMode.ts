import readline from "readline";
import colors from "colors";
import { Logger } from "../core/Logger";
import { EntropyEngine } from "../engine/EntropyEngine";
import { CrackTimeModel } from "../engine/CrackTimeModel";
import { InputRiskEngine } from "../engine/InputRiskEngine";
import { NetworkSafetyEngine } from "../engine/NetworkSafetyEngine";
import { CryptoUtilityEngine } from "../engine/CryptoUtilityEngine";
import { OutputFormatter } from "./OutputFormatter";
import { InputValidator } from "../validators/InputValidator";
import { FullAnalysisReport } from "../types";
import { AnalysisTarget } from "../models/AnalysisTarget";
import { SecurityReport } from "../models/SecurityReport";

export class InteractiveMode {
  private rl: readline.Interface;
  private logger: Logger;
  private networkEngine: NetworkSafetyEngine;
  private cryptoEngine: CryptoUtilityEngine;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.logger = Logger.getInstance();
    this.networkEngine = new NetworkSafetyEngine();
    this.cryptoEngine = new CryptoUtilityEngine();
  }

  public start(): void {
    console.clear();
    console.log(
      colors.cyan(`
  _    _  _____       _    _  _______  ______
 | |  | |/ ____|     | |  | |/ /  __ \\|  ____|
 | |__| | (___ ______| |__| | /| |__) | |__   
 |  __  |\\___ \\______|  __  |/ |  ___/|  __|  
 | |  | |____) |     | |  | |  | |    | |____ 
 |_|  |_|_____/      |_|  |_|  |_|    |_|______|
                                              
 hackerx-security-intelligence-cli v2.0.0 (Enterprise)
 Type 'help' for commands, 'exit' to quit.
        `)
    );

    this.prompt();
  }

  private prompt(): void {
    this.rl.question(colors.green("hx-sec> "), async (answer) => {
      const input = answer.trim();

      if (input === "exit" || input === "quit") {
        this.logger.info("Shutting down...");
        this.rl.close();
        process.exit(0);
      }

      if (input) {
        await this.handleInput(input);
      }

      this.prompt();
    });
  }

  private async handleInput(rawInput: string): Promise<void> {
    try {
      const args = rawInput.split(" ");
      const command = args[0].toLowerCase();
      const param = args.slice(1).join(" ");

      switch (command) {
        case "help":
          this.showHelp();
          break;
        case "scan":
        case "net":
          if (!param) {
            console.log(colors.red("Usage: scan <url>"));
          } else {
            console.log(colors.gray("Initiating network scan..."));
            const report = await this.networkEngine.scan(param);
            console.log(OutputFormatter.formatNetworkReport(report));
          }
          break;
        case "hash":
          if (!param) {
            console.log(colors.red("Usage: hash <text>"));
          } else {
            console.log(
              colors.yellow(`MD5:    ${this.cryptoEngine.hash(param, "md5")}`)
            );
            console.log(
              colors.yellow(`SHA1:   ${this.cryptoEngine.hash(param, "sha1")}`)
            );
            console.log(
              colors.green(`SHA256: ${this.cryptoEngine.hash(param, "sha256")}`)
            );
          }
          break;
        case "enc":
          if (!param) {
            console.log(colors.red("Usage: enc <text>"));
          } else {
            console.log(
              colors.cyan(
                `Base64: ${this.cryptoEngine.encode(param, "base64")}`
              )
            );
            console.log(
              colors.cyan(`Hex:    ${this.cryptoEngine.encode(param, "hex")}`)
            );
            console.log(
              colors.cyan(`URL:    ${this.cryptoEngine.encode(param, "url")}`)
            );
          }
          break;
        case "dec":
          // Auto-detect or assume base64 for now
          if (!param) {
            console.log(colors.red("Usage: dec <base64_text>"));
          } else {
            try {
              console.log(
                colors.green(
                  `Decoded: ${this.cryptoEngine.decode(param, "base64")}`
                )
              );
            } catch (e) {
              console.log(colors.red("Failed to decode"));
            }
          }
          break;
        default:
          // Default to analysis
          this.analyzeInput(rawInput);
          break;
      }
    } catch (error: any) {
      console.log(colors.red(`Error: ${error.message}`));
    }
  }

  private analyzeInput(rawInput: string): void {
    const validString = InputValidator.validate(rawInput);
    const target = new AnalysisTarget(validString);

    const entropyEngine = new EntropyEngine();
    const crackTimeModel = new CrackTimeModel();
    const riskEngine = new InputRiskEngine();

    const entropy = entropyEngine.calculate(target);
    const combinations = crackTimeModel.calculateCombinations(target);
    const crackTime = crackTimeModel.estimate(combinations);
    const risk = riskEngine.analyze(target.raw);

    const report = new SecurityReport(target, entropy, crackTime, risk);

    console.log(OutputFormatter.formatTable(report.toLegacyReport()));
  }

  private showHelp(): void {
    console.log(colors.yellow("\nAvailable Commands:"));
    console.log(
      colors.white("  scan <url>       ") +
        colors.gray("Active network reconnaissance & header analysis")
    );
    console.log(
      colors.white("  hash <text>      ") +
        colors.gray("Generate crypto hashes (MD5, SHA1, SHA256)")
    );
    console.log(
      colors.white("  enc <text>       ") +
        colors.gray("Encode text to Base64, Hex, URL")
    );
    console.log(
      colors.white("  dec <text>       ") +
        colors.gray("Decode text from Base64")
    );
    console.log(
      colors.white("  <any text>       ") +
        colors.gray("Analyze password strength/entropy")
    );
    console.log(
      colors.white("  exit             ") + colors.gray("Quit the shell")
    );
    console.log("");
  }
}
