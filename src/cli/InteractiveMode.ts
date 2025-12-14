import readline from "readline";
import colors from "colors";
import { Logger } from "../core/Logger";
import { EntropyEngine } from "../engine/EntropyEngine";
import { CrackTimeModel } from "../engine/CrackTimeModel";
import { InputRiskEngine } from "../engine/InputRiskEngine";
import { OutputFormatter } from "./OutputFormatter";
import { InputValidator } from "../validators/InputValidator";
import { FullAnalysisReport } from "../types";
import { AnalysisTarget } from "../models/AnalysisTarget";
import { SecurityReport } from "../models/SecurityReport";

export class InteractiveMode {
  private rl: readline.Interface;
  private logger: Logger;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.logger = Logger.getInstance();
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
                                              
 hackerx-security-intelligence-cli v1.0.0
 Type 'exit' to quit.
        `)
    );

    this.prompt();
  }

  private prompt(): void {
    this.rl.question(colors.green("hx-sec> "), (answer) => {
      const input = answer.trim();

      if (input === "exit" || input === "quit") {
        this.logger.info("Shutting down...");
        this.rl.close();
        process.exit(0);
      }

      if (input) {
        this.handleInput(input);
      }

      this.prompt();
    });
  }

  private handleInput(rawInput: string): void {
    try {
      const validString = InputValidator.validate(rawInput);
      const target = new AnalysisTarget(validString);

      const entropyEngine = new EntropyEngine();
      const crackTimeModel = new CrackTimeModel();
      const riskEngine = new InputRiskEngine();

      const entropy = entropyEngine.calculate(target);
      const combinations = crackTimeModel.calculateCombinations(target);
      const crackTime = crackTimeModel.estimate(combinations);
      const risk = riskEngine.analyze(target.raw);

      // Create rich report
      const report = new SecurityReport(target, entropy, crackTime, risk);

      console.log(OutputFormatter.formatTable(report.toLegacyReport()));
    } catch (error: any) {
      console.log(colors.red(`Error: ${error.message}`));
    }
  }
}
