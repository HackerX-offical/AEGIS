import { ToolRegistry } from "../core/ToolRegistry";
import { MenuSystem } from "../ui/MenuSystem";
import { BootLoader } from "../ui/BootLoader";

// Import all tool modules
// Import all tool modules
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

export class InteractiveMode {
  private registry: ToolRegistry;
  private menuSystem: MenuSystem;

  constructor() {
    this.registry = new ToolRegistry();
    this.registerAllTools();
    this.menuSystem = new MenuSystem(this.registry);
  }

  private registerAllTools(): void {
    // Core
    this.registry.register(new Core.SecurityKernelTool());
    this.registry.register(new Core.LabVirtualizerTool());
    this.registry.register(new Core.AttackSurfaceMapperTool());
    this.registry.register(new Core.ComplianceEngineTool());
    this.registry.register(new Core.TelemetryMonitorTool());

    // Network
    this.registry.register(new Network.NetScopeTool());
    this.registry.register(new Network.ProtocolAnalyzerTool());
    this.registry.register(new Network.FirewallSimTool());
    this.registry.register(new Network.ZeroTrustTool());
    this.registry.register(new Network.CloudScannerTool());

    // Web
    this.registry.register(new Web.WebThreatModelerTool());
    this.registry.register(new Web.InputValidationTool());
    this.registry.register(new Web.APIAuditorTool());
    this.registry.register(new Web.CodeSmellTool());
    this.registry.register(new Web.OWASPMapperTool());

    // Malware
    this.registry.register(new Malware.MalwareSandboxTool());
    this.registry.register(new Malware.BehaviorVisualizerTool());
    this.registry.register(new Malware.BinaryExplainerTool());
    this.registry.register(new Malware.ThreatClassifierTool());
    this.registry.register(new Malware.SignatureGeneratorTool());

    // Forensics
    this.registry.register(new Forensics.DiskForensicsTool());
    this.registry.register(new Forensics.MemoryAnalyzerTool());
    this.registry.register(new Forensics.TimelineTool());
    this.registry.register(new Forensics.LogCorrelationTool());
    this.registry.register(new Forensics.IRPlaybookTool());

    // AI
    this.registry.register(new AI.SecurityCopilotTool());
    this.registry.register(new AI.ThreatPredictionTool());
    this.registry.register(new AI.ImpactAITool());
    this.registry.register(new AI.AutoReportTool());
    this.registry.register(new AI.RiskScoringTool());

    // Purple
    this.registry.register(new Purple.AttackSimTool());
    this.registry.register(new Purple.DefenseTesterTool());
    this.registry.register(new Purple.KillChainTool());
    this.registry.register(new Purple.SOCTrainingTool());
    this.registry.register(new Purple.CTFEngineTool());

    // Bounty
    this.registry.register(new Bounty.ScopeValidatorTool());
    this.registry.register(new Bounty.VulnDraftingTool());
    this.registry.register(new Bounty.ReproductionRecorderTool());
    this.registry.register(new Bounty.CVSSCalculatorTool());
    this.registry.register(new Bounty.DisclosureTrackerTool());

    // OSINT
    this.registry.register(new Osint.MetadataAnalyzerTool());
    this.registry.register(new Osint.LeakMonitorTool());
    this.registry.register(new Osint.ActorResearchTool());
    this.registry.register(new Osint.DarkWebTool());
    this.registry.register(new Osint.PrivacyScannerTool());

    // Edu
    this.registry.register(new Edu.LearningEngineTool());
    this.registry.register(new Edu.CertBuilderTool());
    this.registry.register(new Edu.AuditModeTool());
    this.registry.register(new Edu.ParentalControlTool());
    this.registry.register(new Edu.SDKTool());
  }

  public async start(): Promise<void> {
    await BootLoader.boot();
    this.menuSystem.start();
  }
}
