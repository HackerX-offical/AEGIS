import { promises as dns } from "dns";
import colors from "colors";

export class DNSIntel {
  public async lookup(domain: string): Promise<string> {
    let output = `\n${colors.cyan(
      "--- DNS INTELLIGENCE: " + domain + " ---"
    )}\n`;

    try {
      // A Records (IPv4)
      try {
        const a = await dns.resolve4(domain);
        output += `${colors.yellow("A Records (IPv4):")}\n`;
        a.forEach((ip) => (output += `  - ${ip}\n`));
      } catch (e) {
        output += `${colors.gray("A Records: None found")}\n`;
      }

      // AAAA Records (IPv6)
      try {
        const aaaa = await dns.resolve6(domain);
        output += `${colors.yellow("AAAA Records (IPv6):")}\n`;
        aaaa.forEach((ip) => (output += `  - ${ip}\n`));
      } catch (e) {
        output += `${colors.gray("AAAA Records: None found")}\n`;
      }

      // MX Records (Mail)
      try {
        const mx = await dns.resolveMx(domain);
        output += `${colors.yellow("MX Records:")}\n`;
        mx.forEach(
          (rec) =>
            (output += `  - ${rec.exchange} (Priority: ${rec.priority})\n`)
        );
      } catch (e) {
        output += `${colors.gray("MX Records: None found")}\n`;
      }

      // TXT Records (SPF/DMARC)
      try {
        const txt = await dns.resolveTxt(domain);
        output += `${colors.yellow("TXT Records:")}\n`;
        txt.forEach((rec) => (output += `  - ${rec.join(" ")}\n`));
      } catch (e) {
        output += `${colors.gray("TXT Records: None found")}\n`;
      }
    } catch (error: any) {
      return colors.red(`DNS Lookup Failed: ${error.message}`);
    }

    output += `\n${colors.cyan("---------------------------------------")}\n`;
    return output;
  }
}
