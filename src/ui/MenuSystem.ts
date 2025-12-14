import colors from "colors";
import { ConsoleManager } from "./ConsoleManager";
import { ToolRegistry } from "../core/ToolRegistry";
import { ToolCategory, SecurityTool } from "../types/ToolInterfaces";

enum ViewState {
  CATEGORIES,
  TOOLS,
  EXECUTION,
}

export class MenuSystem {
  private consoleManager: ConsoleManager;
  private registry: ToolRegistry;
  private state: ViewState = ViewState.CATEGORIES;

  private categories: string[];
  private selectedCategoryIndex: number = 0;

  private tools: SecurityTool[] = [];
  private selectedToolIndex: number = 0;

  constructor(registry: ToolRegistry) {
    this.registry = registry;
    this.consoleManager = new ConsoleManager();
    this.categories = Object.values(ToolCategory);

    this.consoleManager.setHandler(this.handleKey.bind(this));
  }

  public start(): void {
    this.consoleManager.showCursor(false);
    this.render();
  }

  private handleKey(key: string, ctrl: boolean): void {
    if (key === "q" && !ctrl) {
      process.exit(0);
    }

    if (key === "h" && !ctrl) {
      this.state = ViewState.CATEGORIES;
      this.render();
      return;
    }

    if (this.state === ViewState.CATEGORIES) {
      if (key === "up") {
        this.selectedCategoryIndex = Math.max(
          0,
          this.selectedCategoryIndex - 1
        );
      } else if (key === "down") {
        this.selectedCategoryIndex = Math.min(
          this.categories.length - 1,
          this.selectedCategoryIndex + 1
        );
      } else if (key === "return" || key === "enter") {
        this.selectCategory();
      }
    } else if (this.state === ViewState.TOOLS) {
      if (key === "up") {
        this.selectedToolIndex = Math.max(0, this.selectedToolIndex - 1);
      } else if (key === "down") {
        this.selectedToolIndex = Math.min(
          this.tools.length - 1,
          this.selectedToolIndex + 1
        );
      } else if (key === "escape" || key === "backspace") {
        this.state = ViewState.CATEGORIES;
      } else if (key === "return" || key === "enter") {
        this.runTool();
      }
    } else if (this.state === ViewState.EXECUTION) {
      // In execution mode, wait for specific keys to go back
      if (key === "return" || key === "enter" || key === "escape") {
        this.state = ViewState.TOOLS;
        // Delay slightly to allow reading output
        this.render();
        return;
      }
    }

    if (this.state !== ViewState.EXECUTION) {
      this.render();
    }
  }

  private selectCategory(): void {
    const cat = this.categories[this.selectedCategoryIndex] as ToolCategory;
    this.tools = this.registry.getToolsByCategory(cat);
    this.selectedToolIndex = 0;
    this.state = ViewState.TOOLS;
    this.render();
  }

  private async runTool(): Promise<void> {
    this.state = ViewState.EXECUTION;
    this.consoleManager.clear();
    const tool = this.tools[this.selectedToolIndex];

    this.consoleManager.print(
      colors.green(`\n[ EXECUTING: ${tool.name} ]\n\n`)
    );

    // Mock prompt for args if needed? For now we run without args or prompt.
    // In a real TUI we'd switch to an input ViewState.
    // For simplicity of this "demo", we pass dummy args or empty.

    try {
      await tool.execute([]);
    } catch (e: any) {
      this.consoleManager.print(colors.red(`Error: ${e.message}`));
    }

    this.consoleManager.print(
      colors.gray("\n\nPress Enter or Esc to return...")
    );
  }

  private render(): void {
    this.consoleManager.clear();
    this.renderHeader();

    // We defer status bar rendering to the ConsoleManager's loop or manual call?
    // Actually, let's trigger it immediately so it doesn't lag.
    this.consoleManager.renderStatusBar();

    if (this.state === ViewState.CATEGORIES) {
      this.consoleManager.print(
        colors.green.bold(
          "\n  ╔════════════════════════════════════════════════╗"
        )
      );
      this.consoleManager.print(
        colors.green.bold(
          "\n  ║             MISSION CONTROL                    ║"
        )
      );
      this.consoleManager.print(
        colors.green.bold(
          "\n  ╠════════════════════════════════════════════════╣\n"
        )
      );
      this.categories.forEach((cat, index) => {
        const isSelected = index === this.selectedCategoryIndex;
        const prefix = isSelected ? colors.green("  ║ > ") : "  ║   ";
        const text = isSelected
          ? colors.black.bgGreen(` ${cat.padEnd(46)} `)
          : colors.green(cat.padEnd(48));
        // We need to handle padding carefully with ansi codes
        const cleanLen = cat.length;
        const padding = " ".repeat(46 - cleanLen);

        if (isSelected) {
          this.consoleManager.print(
            `${prefix}${colors.black.bgGreen(cat + padding)}${colors.green(
              " ║"
            )}\n`
          );
        } else {
          this.consoleManager.print(
            `${prefix}${colors.green(cat + padding)} ║\n`
          );
        }
      });
      this.consoleManager.print(
        colors.green.bold(
          "  ╚════════════════════════════════════════════════╝\n"
        )
      );
    } else if (this.state === ViewState.TOOLS) {
      const cat = this.categories[this.selectedCategoryIndex];
      this.consoleManager.print(
        colors.green.bold(
          `\n  ╔═[ ${cat} ]═══════════════════════════════════╗\n`
        )
      );

      if (this.tools.length === 0) {
        this.consoleManager.print(colors.gray("    No tools available."));
      }

      this.tools.forEach((tool, index) => {
        const isSelected = index === this.selectedToolIndex;
        const prefix = isSelected ? colors.green("  ║ > ") : "  ║   ";
        // Max width 60 approx
        const namePadded = tool.name.padEnd(25);
        const descPadded =
          tool.description.length > 30
            ? tool.description.substring(0, 27) + "..."
            : tool.description.padEnd(30);

        if (isSelected) {
          this.consoleManager.print(
            `${prefix}${colors.black.bgGreen(
              namePadded
            )} ${colors.black.bgWhite(descPadded)} ║\n`
          );
        } else {
          this.consoleManager.print(
            `${prefix}${colors.green(namePadded)} ${colors.gray(
              descPadded
            )} ║\n`
          );
        }
      });
      this.consoleManager.print(
        colors.green.bold(
          "  ╚════════════════════════════════════════════════╝\n"
        )
      );
    }
  }

  private renderHeader(): void {
    this.consoleManager.print(
      colors.green(`
  █████╗ ███████╗ ██████╗ ██╗███████╗    ██████╗ ███████╗
 ██╔══██╗██╔════╝██╔════╝ ██║██╔════╝    ██╔══██╗██╔════╝
 ███████║█████╗  ██║  ███╗██║███████╗    ██║  ██║███████╗
 ██╔══██║██╔══╝  ██║   ██║██║╚════██║    ██║  ██║╚════██║
 ██║  ██║███████╗╚██████╔╝██║███████╗    ██████╔╝███████║
 ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝    ╚═════╝ ╚══════╝
      HACKERX SECURITY INTELLIGENCE [AEGIS v1.0.0]

`)
    );
  }
}
