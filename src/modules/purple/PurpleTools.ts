import { SecurityTool, ToolCategory } from "../../types/ToolInterfaces";
import { SimulationUtils } from "../../utils/SimulationUtils";
import colors from "colors";

export class AttackSimTool implements SecurityTool {
  id = "attacksim";
  name = "Attack Simulator";
  category = ToolCategory.PURPLE;
  description = "Simulates attacks on labs only";
  async execute(args: string[]): Promise<void> {
    console.log(colors.red("Launching simulated Brute Force against Lab-A..."));
    await SimulationUtils.progressBar("Spraying Passwords", 800);
    console.log("Attack sent. Observing logs.");
    console.log(
      colors.green(
        "Result: Blocked by Account Lockout Policy after 5 attempts."
      )
    );
  }
}

export class DefenseTesterTool implements SecurityTool {
  id = "defensetest";
  name = "Defense Effectiveness";
  category = ToolCategory.PURPLE;
  description = "Tests detection & response";
  async execute(args: string[]): Promise<void> {
    console.log(colors.cyan("Replaying PCAP: 'embear_threat_emulation.pcap'"));
    await SimulationUtils.sleep(500);
    console.log("Alert triggered: SNORT-SID-1002 (Buffer Overflow)");
    console.log("Response Time: 200ms (Excellent)");
  }
}

export class KillChainTool implements SecurityTool {
  id = "killchain";
  name = "Kill Chain Visualizer";
  category = ToolCategory.PURPLE;
  description = "Shows attack stages visually";
  async execute(args: string[]): Promise<void> {
    const stages = [
      "Reconnaissance",
      "Weaponization",
      "Delivery",
      "Exploitation",
      "Installation",
      "C2",
      "Actions on Objectives",
    ];
    for (const stage of stages) {
      await SimulationUtils.sleep(200);
      console.log(`[x] ${stage} ... ${colors.green("MITIGATED")}`);
    }
    console.log(
      colors.blue("Attack was stopped at Stage 3: Delivery (Email Filter).")
    );
  }
}

export class SOCTrainingTool implements SecurityTool {
  id = "soctrain";
  name = "SOC Training Arena";
  category = ToolCategory.PURPLE;
  description = "Trains analysts with scenarios";
  async execute(args: string[]): Promise<void> {
    console.log(
      colors.magenta("Scenario #42: Insider Threat Data Exfiltration")
    );
    console.log("Task: Identify the file uploaded to Dropbox.");
    console.log("Logs provided: Proxy Logs, DLP Logs.");
    console.log("Time Limit: 15:00 minutes.");
    console.log(colors.yellow("Type 'start' to begin simulation (Mock)."));
  }
}

export class CTFEngineTool implements SecurityTool {
  id = "ctf";
  name = "CTF Engine";
  category = ToolCategory.PURPLE;
  description = "Built-in legal competitions";
  async execute(args: string[]): Promise<void> {
    console.log(colors.green("Challenge: WEB-01 'Cookie Monster'"));
    console.log("Description: The admin cookie looks weird.");
    console.log("Target: http://localhost:3000/ctf/01");
    console.log("Flag Format: HX{...}");
  }
}
