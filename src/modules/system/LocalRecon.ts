import os from "os";
import colors from "colors";

export class LocalRecon {
  public getSystemInfo(): string {
    let output = `\n${colors.cyan("--- LOCAL SYSTEM RECON ---")}\n`;

    output += `Hostname: ${colors.white(os.hostname())}\n`;
    output += `OS:       ${os.type()} ${os.release()} (${os.arch()})\n`;
    output += `Uptime:   ${(os.uptime() / 3600).toFixed(2)} hours\n`;
    output += `CPUs:     ${os.cpus().length} cores\n`;
    output += `Memory:   ${(os.freemem() / 1024 / 1024 / 1024).toFixed(
      2
    )} GB Free / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB Total\n`;

    output += `\n${colors.yellow("[ NETWORK INTERFACES ]")}\n`;
    const interfaces = os.networkInterfaces();
    for (const [name, info] of Object.entries(interfaces)) {
      if (!info) continue;
      output += `${colors.bold(name)}:\n`;
      info.forEach((iface) => {
        const family = iface.family;
        const addr = iface.address;
        const mac = iface.mac;
        const internal = iface.internal ? "(Internal)" : "";
        output += `  - ${family} ${addr} ${colors.gray(mac)} ${internal}\n`;
      });
    }

    output += `\n${colors.cyan("---------------------------------------")}\n`;
    return output;
  }
}
