import { Command } from "commander";
import { Logger } from "../core/Logger";
import { Config } from "../core/Config";
import { EntropyEngine } from "../engine/EntropyEngine";
import { CrackTimeModel } from "../engine/CrackTimeModel";
import { InputRiskEngine } from "../engine/InputRiskEngine";
import { HashingDemo } from "../engine/HashingDemo";
import { OutputFormatter } from "./OutputFormatter";
import { FullAnalysisReport } from "../types";
import { InputValidator } from "../validators/InputValidator";
import colors from "colors";
import { AnalysisTarget } from "../models/AnalysisTarget";
import { SecurityReport } from "../models/SecurityReport";

export class Program {
  private program: Command;
  private logger: Logger;
  private config: Config;

  constructor() {
    this.program = new Command();
    this.logger = Logger.getInstance();
    this.config = Config.getInstance();
    this.setup();
  }

  private setup(): void {
    this.program
      .name("hx-sec")
      .description(
        "HackerX Security Intelligence CLI - Educational Security Analysis Tool"
      )
      .version(this.config.get("version"));

    this.program
      .command("analyze")
      .description("Analyze a password/input for security metrics")
      .argument("<input>", "String to analyze")
      .option("-j, --json", "Output results as JSON")
      .action((input, options) => {
        this.analyze(input, options);
      });

    this.program
      .command("demo")
      .description("Demonstrate hashing and salting")
      .argument("<input>", "Input string to hash")
      .action((input) => {
        new HashingDemo().demonstrate(input);
      });

    this.program
      .command("interactive")
      .description("Start interactive shell mode")
      .action(() => {
        const { InteractiveMode } = require("./InteractiveMode");
        new InteractiveMode().start();
      });
  }

  private analyze(rawInput: string, options: any): void {
    try {
      const validString = InputValidator.validate(rawInput);
      const target = new AnalysisTarget(validString);

      this.logger.debug(
        `Analyzing input: ${target.length} chars, ${target.byteLength} bytes`
      );

      const entropyEngine = new EntropyEngine();
      const crackTimeModel = new CrackTimeModel();
      const riskEngine = new InputRiskEngine();

      // Refactored calls using AnalysisTarget
      const entropy = entropyEngine.calculate(target);
      const combinations = crackTimeModel.calculateCombinations(target);
      const crackTime = crackTimeModel.estimate(combinations);
      const risk = riskEngine.analyze(target.raw); // Risk engine still takes string for regex

      // Create rich report model
      const report = new SecurityReport(target, entropy, crackTime, risk);

      if (options.json) {
        console.log(report.toJSON());
      } else {
        // Formatting logic needs to unwrap or be updated.
        // For now, we use the legacy report structure for the formatter.
        console.log(OutputFormatter.formatTable(report.toLegacyReport()));
      }
    } catch (error: any) {
      this.logger.error(error.message);
      process.exit(1);
    }
  }

  public run(): void {
    if (process.argv.length <= 2) {
      const { InteractiveMode } = require("./InteractiveMode");
      new InteractiveMode().start();
    } else {
      this.program.parse(process.argv);
    }
  }
}
