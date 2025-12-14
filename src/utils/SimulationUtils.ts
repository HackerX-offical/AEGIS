import colors from "colors";

export class SimulationUtils {
  public static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async progressBar(
    label: string,
    duration: number = 1000
  ): Promise<void> {
    const width = 30;
    const frames = ["|", "/", "-", "\\"];
    let progress = 0;
    const step = 100 / (duration / 50);

    process.stdout.write(colors.cyan(`${label} [${" ".repeat(width)}] 0%`));

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        progress += step;
        const filled = Math.min(width, Math.round((progress / 100) * width));
        const empty = Math.max(0, width - filled);
        const bar = "█".repeat(filled) + " ".repeat(empty);
        const frame = frames[Math.floor(progress) % frames.length];

        process.stdout.write(
          `\r${colors.cyan(label)} [${colors.green(bar)}] ${Math.min(
            100,
            Math.floor(progress)
          )}% ${frame}`
        );

        if (progress >= 100) {
          clearInterval(interval);
          process.stdout.write(`\n`);
          resolve();
        }
      }, 50);
    });
  }

  public static hexDump(data: string, length: number = 64): void {
    console.log(colors.yellow("--- MEMORY DUMP START ---"));
    for (let i = 0; i < length; i += 16) {
      const offset = i.toString(16).padStart(8, "0");
      const hex = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0")
      ).join(" ");
      const ascii = Array.from({ length: 16 }, () => ".").join("");
      console.log(
        `${colors.gray("0x" + offset)}  ${colors.white(hex)}  ${colors.gray(
          ascii
        )}`
      );
    }
    console.log(colors.yellow("--- MEMORY DUMP END ---"));
  }

  public static async logThinking(
    processName: string,
    steps: string[]
  ): Promise<void> {
    console.log(colors.magenta(`[AI] ${processName} is thinking...`));
    for (const step of steps) {
      await this.sleep(300);
      console.log(colors.gray(`  > ${step}`));
    }
    console.log(colors.green(`[AI] Analysis Complete.`));
  }

  public static randomIP(): string {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }
}
