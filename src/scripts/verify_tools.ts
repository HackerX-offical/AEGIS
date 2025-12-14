import colors from "colors";
import { ToolRegistry } from "../core/ToolRegistry";

// Import all tool modules - we need to register them similar to InteractiveMode
import * as Core from "../modules/core/CoreTools";
import * as Network from "../modules/network/NetworkTools";
import * as Web from "../modules/web/WebTools";
import * as Malware from "../modules/malware/MalwareTools";
import * as Forensics from "../modules/forensics/ForensicsTools";
import * as AI from "../modules/ai/AITools";
import * as Purple from "../modules/purple/PurpleTools";
import * as Bounty from "../modules/bounty/BountyTools";
import * as Osint from "../modules/osint/OsintTools";
import * as Edu from "../modules/edu/EduTools";

const registry = new ToolRegistry();

function registerAll(): void {
  // Core
  registry.register(new Core.SecurityKernelTool());
  registry.register(new Core.LabVirtualizerTool());
  registry.register(new Core.AttackSurfaceMapperTool());
  registry.register(new Core.ComplianceEngineTool());
  registry.register(new Core.TelemetryMonitorTool());

  // Network
  registry.register(new Network.NetScopeTool());
  registry.register(new Network.ProtocolAnalyzerTool());
  registry.register(new Network.FirewallSimTool());
  registry.register(new Network.ZeroTrustTool());
  registry.register(new Network.CloudScannerTool());

  // Web
  registry.register(new Web.WebThreatModelerTool());
  registry.register(new Web.InputValidationTool());
  registry.register(new Web.APIAuditorTool());
  registry.register(new Web.CodeSmellTool());
  registry.register(new Web.OWASPMapperTool());

  // Malware
  registry.register(new Malware.MalwareSandboxTool());
  registry.register(new Malware.BehaviorVisualizerTool());
  registry.register(new Malware.BinaryExplainerTool());
  registry.register(new Malware.ThreatClassifierTool());
  registry.register(new Malware.SignatureGeneratorTool());

  // Forensics
  registry.register(new Forensics.DiskForensicsTool());
  registry.register(new Forensics.MemoryAnalyzerTool());
  registry.register(new Forensics.TimelineTool());
  registry.register(new Forensics.LogCorrelationTool());
  registry.register(new Forensics.IRPlaybookTool());

  // AI
  registry.register(new AI.SecurityCopilotTool());
  registry.register(new AI.ThreatPredictionTool());
  registry.register(new AI.ImpactAITool());
  registry.register(new AI.AutoReportTool());
  registry.register(new AI.RiskScoringTool());

  // Purple
  registry.register(new Purple.AttackSimTool());
  registry.register(new Purple.DefenseTesterTool());
  registry.register(new Purple.KillChainTool());
  registry.register(new Purple.SOCTrainingTool());
  registry.register(new Purple.CTFEngineTool());

  // Bounty
  registry.register(new Bounty.ScopeValidatorTool());
  registry.register(new Bounty.VulnDraftingTool());
  registry.register(new Bounty.ReproductionRecorderTool());
  registry.register(new Bounty.CVSSCalculatorTool());
  registry.register(new Bounty.DisclosureTrackerTool());

  // OSINT
  registry.register(new Osint.MetadataAnalyzerTool());
  registry.register(new Osint.LeakMonitorTool());
  registry.register(new Osint.ActorResearchTool());
  registry.register(new Osint.DarkWebTool());
  registry.register(new Osint.PrivacyScannerTool());

  // Edu
  registry.register(new Edu.LearningEngineTool());
  registry.register(new Edu.CertBuilderTool());
  registry.register(new Edu.AuditModeTool());
  registry.register(new Edu.ParentalControlTool());
  registry.register(new Edu.SDKTool());
}

async function verify(): Promise<void> {
  registerAll();
  const tools = registry.getAllTools();
  console.log(
    colors.cyan(`[VERIFY] Starting verification of ${tools.length} tools...\n`)
  );

  let passed = 0;
  let failed = 0;

  for (const tool of tools) {
    process.stdout.write(
      colors.yellow(`Testing ${tool.id} [${tool.name}]... `)
    );

    try {
      // Provide specific args for tools that are picky
      let args = ["google.com"]; // Default

      if (tool.id === "apiaudit") {
        // Valid HS256 JWT
        args = [
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        ];
      } else if (tool.id === "validator") {
        args = ["xss"];
      } else if (tool.id === "crack") {
        args = ["password123"];
      }

      // Capture stdout to prevent cluttering the verify log too much, or just let it flow?
      // For now, let's just run it. We updated them to use SimulationUtils which prints, so we'll see output.
      console.log(""); // Newline for tool output
      await tool.execute(args);
      console.log(colors.green(`\n[PASS] ${tool.id}`));
      passed++;
    } catch (e: any) {
      console.log(colors.red(`\n[FAIL] ${tool.id} - ${e.message}`));
      failed++;
    }
    console.log(colors.gray("-----------------------------------"));
  }

  console.log(colors.bold(`\nVerification Complete.`));
  console.log(colors.green(`Passed: ${passed}`));
  if (failed > 0) {
    console.log(colors.red(`Failed: ${failed}`));
    process.exit(1);
  } else {
    console.log(colors.blue("All systems nominal."));
    process.exit(0);
  }
}

verify();
