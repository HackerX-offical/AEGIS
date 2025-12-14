import dotenv from "dotenv";
import path from "path";
import { Logger } from "./Logger";

dotenv.config();

export interface AppConfig {
  env: "development" | "production" | "test";
  logLevel: string;
  version: string;
}

export class Config {
  private static instance: Config;
  public readonly settings: AppConfig;

  private constructor() {
    this.settings = {
      env:
        (process.env.NODE_ENV as "development" | "production" | "test") ||
        "development",
      logLevel: process.env.LOG_LEVEL || "info",
      version: "1.0.0", // Could read from package.json but keeping simple for now
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get(key: keyof AppConfig): any {
    return this.settings[key];
  }
}
