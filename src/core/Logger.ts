import colors from "colors";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static instance: Logger;
  private level: LogLevel = LogLevel.INFO;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public debug(message: string, context?: any): void {
    if (this.level <= LogLevel.DEBUG) {
      console.log(colors.gray(`[DEBUG] ${message}`), context ? context : "");
    }
  }

  public info(message: string): void {
    if (this.level <= LogLevel.INFO) {
      console.log(colors.cyan(`[INFO]  ${message}`));
    }
  }

  public warn(message: string): void {
    if (this.level <= LogLevel.WARN) {
      console.log(colors.yellow(`[WARN]  ${message}`));
    }
  }

  public error(message: string, error?: Error): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(colors.red(`[ERROR] ${message}`));
      if (error && error.stack) {
        console.error(colors.red(error.stack));
      }
    }
  }

  public success(message: string): void {
    console.log(colors.green(`[SUCCESS] ${message}`));
  }
}
