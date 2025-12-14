import colors from "colors";

export abstract class Widget {
  constructor(
    protected x: number,
    protected y: number,
    protected width: number,
    protected height: number
  ) {}
  abstract render(buffer: string[][]): void; // Conceptual, or direct draw?
  // Direct draw is easier for now with ConsoleManager
}

// Simple Box Drawing
export class Panel {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private title: string,
    private color: (str: string) => string = colors.green
  ) {}

  public render(): void {
    const topParams = "═".repeat(this.width - 2);
    const bottomParams = "═".repeat(this.width - 2);

    // Draw Top
    process.stdout.write(`\x1B[${this.y};${this.x}H`);
    process.stdout.write(this.color(`╔${topParams}╗`));

    // Draw Title
    if (this.title) {
      process.stdout.write(`\x1B[${this.y};${this.x + 2}H`);
      process.stdout.write(this.color(`[ ${this.title} ]`));
    }

    // Draw Sides
    for (let i = 1; i < this.height - 1; i++) {
      process.stdout.write(`\x1B[${this.y + i};${this.x}H`);
      process.stdout.write(this.color("║"));
      process.stdout.write(`\x1B[${this.y + i};${this.x + this.width - 1}H`);
      process.stdout.write(this.color("║"));
    }

    // Draw Bottom
    process.stdout.write(`\x1B[${this.y + this.height - 1};${this.x}H`);
    process.stdout.write(this.color(`╚${bottomParams}╝`));
  }
}
