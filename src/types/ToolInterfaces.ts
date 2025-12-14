export enum ToolCategory {
  CORE = "Core Platform",
  NETWORK = "Network & Infra",
  WEB = "Web & App Security",
  MALWARE = "Malware Analysis",
  FORENSICS = "Forensics & IR",
  AI = "AI Intelligence",
  PURPLE = "Purple Team",
  BOUNTY = "Bug Bounty",
  OSINT = "Privacy & OSINT",
  EDU = "Education & Governance",
}

export interface SecurityTool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  execute(args: string[]): Promise<void>;
}
