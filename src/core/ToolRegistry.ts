import { SecurityTool, ToolCategory } from "../types/ToolInterfaces";
import colors from "colors";

export class ToolRegistry {
  private tools: Map<string, SecurityTool> = new Map();

  public register(tool: SecurityTool): void {
    this.tools.set(tool.id.toLowerCase(), tool);
  }

  public getTool(id: string): SecurityTool | undefined {
    return this.tools.get(id.toLowerCase());
  }

  public getAllTools(): SecurityTool[] {
    return Array.from(this.tools.values());
  }

  public getToolsByCategory(category: ToolCategory): SecurityTool[] {
    return this.getAllTools().filter((t) => t.category === category);
  }

  public listTools(): void {
    const categories = Object.values(ToolCategory);

    categories.forEach((cat) => {
      const catTools = this.getToolsByCategory(cat);
      if (catTools.length > 0) {
        console.log(colors.yellow(`\n[ ${cat} ]`));
        catTools.forEach((tool) => {
          console.log(
            `${colors.cyan(tool.id.padEnd(15))} ${colors.white(
              tool.name.padEnd(30)
            )} ${colors.gray(tool.description)}`
          );
        });
      }
    });
  }
}
