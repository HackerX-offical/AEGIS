import colors from "colors";

export class Table {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private columns: string[],
    private data: string[][]
  ) {}

  public updateData(newData: string[][]): void {
    this.data = newData;
  }

  public render(): void {
    const colWidth = Math.floor((this.width - 4) / this.columns.length);

    // Header
    process.stdout.write(`\x1B[${this.y};${this.x}H`);
    const header = this.columns.map((c) => c.padEnd(colWidth)).join("│");
    process.stdout.write(colors.black.bgGreen(` ${header} `));

    // Rows
    this.data.forEach((row, index) => {
      if (index > 10) return; // Limit rows
      process.stdout.write(`\x1B[${this.y + 1 + index};${this.x}H`);
      const rowStr = row
        .map((d) => d.substring(0, colWidth).padEnd(colWidth))
        .join("│");
      process.stdout.write(colors.green(` ${rowStr} `));
    });
  }
}
