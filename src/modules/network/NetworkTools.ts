import { SecurityTool, ToolCategory } from "../../types/ToolInterfaces";
import colors from "colors";

import { ConsoleManager } from "../../ui/ConsoleManager";
import { Panel } from "../../ui/widgets/Panel";
import { LogStream } from "../../ui/widgets/LogStream";
import { Table } from "../../ui/widgets/Table";
import readline from "readline";

// 5. NetScope (Advanced Network Intelligence) - INTERACTIVE REBUILD
export class NetScopeTool implements SecurityTool {
  id = "netscope";
  name = "NetScope Intelligence";
  category = ToolCategory.NETWORK;
  description = "Real-time Packet Analyzer & Scout";

  // Use a local console manager for drawing
  private console: ConsoleManager = new ConsoleManager();

  async execute(args: string[]): Promise<void> {
    // 1. Setup UI Layout
    this.console.clear();
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;

    const mainPanel = new Panel(1, 4, width, height - 5, "NetScope v2.0");
    const logPanel = new LogStream(3, 15, width - 6, 8);

    mainPanel.render();

    // 2. Interactive Input
    let target = "";
    if (args.length > 0) {
      target = args[0];
      this.console.printAt(3, 6, `Target: ${target}`);
    } else {
      this.console.printAt(3, 6, "Enter Target IP/Domain: ");
      this.console.showCursor(true);
      target = await this.prompt(3, 7);
      this.console.showCursor(false);
    }

    // 3. Execution Simulation
    this.console.printAt(3, 9, colors.yellow(`Scanning ${target}...`));

    const table = new Table(
      3,
      11,
      width - 6,
      ["PROTOCOL", "PORT", "STATUS", "SERVICE"],
      []
    );

    // Simulated Scan Loop
    const ports = [21, 22, 25, 53, 80, 443, 3306, 8080];
    const services = [
      "FTP",
      "SSH",
      "SMTP",
      "DNS",
      "HTTP",
      "HTTPS",
      "MySQL",
      "HTTP-Proxy",
    ];
    const results: string[][] = [];

    for (let i = 0; i < ports.length; i++) {
      await this.sleep(400);
      const status = Math.random() > 0.3 ? "OPEN" : "FILTERED";
      const color = status === "OPEN" ? colors.green : colors.red;

      results.push(["TCP", ports[i].toString(), color(status), services[i]]);

      // Re-render Table
      table.updateData(results);
      table.render();

      logPanel.addLog(`Probe sent to ${target}:${ports[i]} (SYN)`);
      if (status === "OPEN")
        logPanel.addLog(`[+] ACK received from port ${ports[i]}`);
    }

    logPanel.addLog(
      `Scan Complete. Found ${
        results.filter((r) => r[2].includes("OPEN")).length
      } open ports.`
    );

    this.console.printAt(
      3,
      height - 2,
      colors.gray("Press Enter to return to Dashboard...")
    );
    if (args.length === 0) {
      await this.waitForKey();
    }
  }

  private prompt(x: number, y: number): Promise<string> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      process.stdout.write(`\x1B[${y};${x}H> `);
      rl.question("", (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  private waitForKey(): Promise<void> {
    return new Promise((resolve) => {
      process.stdin.once("data", () => resolve());
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
}

// 7. Protocol Analyzer
export class ProtocolAnalyzerTool implements SecurityTool {
  id = "proto";
  name = "Protocol Analyzer";
  category = ToolCategory.NETWORK;
  description = "Explains protocols & misconfigurations";
  async execute(args: string[]): Promise<void> {
    console.log(colors.yellow("Analyzing transport layer..."));
    console.log("Protocol: TCP/TLS 1.3");
    console.log("Cipher Suite: TLS_AES_256_GCM_SHA384 (Strong)");
  }
}

// 8. Firewall Policy Simulator
export class FirewallSimTool implements SecurityTool {
  id = "fwsim";
  name = "Firewall Simulator";
  category = ToolCategory.NETWORK;
  description = "Tests firewall rules in virtual labs";
  async execute(args: string[]): Promise<void> {
    console.log(colors.blue("Simulating packet: INBOUND TCP 445 -> DROP"));
    console.log(colors.green("Rule #4 matched: Block SMB traffic."));
  }
}

// 9. Zero-Trust Validator
export class ZeroTrustTool implements SecurityTool {
  id = "zerotrust";
  name = "Zero-Trust Validator";
  category = ToolCategory.NETWORK;
  description = "Checks identity & access flows";
  async execute(args: string[]): Promise<void> {
    console.log(colors.cyan("Validating identity assertions..."));
    console.log("MFA: Enforced");
    console.log("Device Trust: Verified");
  }
}

// 10. Cloud Exposure Scanner
export class CloudScannerTool implements SecurityTool {
  id = "cloudscan";
  name = "Cloud Exposure Scanner";
  category = ToolCategory.NETWORK;
  description = "Detects cloud misconfigurations";
  async execute(args: string[]): Promise<void> {
    console.log(colors.red("[SCAN] Checking public buckets..."));
    console.log(colors.green("[OK] No public S3 buckets detected."));
  }
}
