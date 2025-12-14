import readline from "readline";
import colors from "colors";

export type KeyHandler = (key: string, ctrl: boolean) => void;

export class ConsoleManager {
  private handler: KeyHandler | null = null;
  private rl: readline.Interface;
  private refreshInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Enable raw mode
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c") {
        this.shutdown();
        process.exit();
      }
      if (this.handler) {
        this.handler(key.name || str, key.ctrl);
      }
    });

    // Start status bar refresh loop
    this.startStatusBarLoop();
  }

  private startStatusBarLoop(): void {
    this.refreshInterval = setInterval(() => {
      this.renderStatusBar();
    }, 1000);
  }

  public shutdown(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.showCursor(true);
  }

  public renderStatusBar(): void {
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;

    // Save cursor position
    process.stdout.write("\x1B7");

    // Move to last line
    process.stdout.write(`\x1B[${height};0H`);

    const time = new Date().toISOString().replace("T", " ").split(".")[0];
    const cpu = Math.floor(Math.random() * 30) + 10;
    const ram = (Math.random() * 2 + 2).toFixed(1);

    const statusText = ` [SECURE] | CPU: ${cpu}% | RAM: ${ram}GB | IP: 10.14.2.9 | ${time} `;
    const padded = statusText.padEnd(width, " ");

    process.stdout.write(colors.black.bgGreen(padded));

    // Restore cursor position
    process.stdout.write("\x1B8");
  }

  public setHandler(handler: KeyHandler): void {
    this.handler = handler;
  }

  public clear(): void {
    console.clear();
  }

  public print(text: string): void {
    process.stdout.write(text);
  }

  public printAt(x: number, y: number, text: string): void {
    process.stdout.write(`\x1B[${y};${x}H${text}`);
  }

  public newLine(): void {
    process.stdout.write("\n");
  }

  public showCursor(visible: boolean): void {
    process.stdout.write(visible ? "\x1B[?25h" : "\x1B[?25l");
  }
}
