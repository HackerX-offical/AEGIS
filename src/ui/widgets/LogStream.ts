import colors from "colors";

export class LogStream {
  private logs: string[] = [];

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {}

  public addLog(log: string): void {
    this.logs.push(log);
    if (this.logs.length > this.height) {
      this.logs.shift();
    }
    this.render();
  }

  public render(): void {
    this.logs.forEach((log, index) => {
      process.stdout.write(`\x1B[${this.y + index};${this.x}H`);
      // Clear line first
      const empty = " ".repeat(this.width);
      process.stdout.write(`\x1B[${this.y + index};${this.x}H${empty}`);

      process.stdout.write(`\x1B[${this.y + index};${this.x}H`);
      const time = new Date().toISOString().split("T")[1].split(".")[0];
      process.stdout.write(colors.gray(`${time} > `) + colors.green(log));
    });
  }
}
