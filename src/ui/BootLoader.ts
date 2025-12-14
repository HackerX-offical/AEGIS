import colors from "colors";
import { SimulationUtils } from "../utils/SimulationUtils";

export class BootLoader {
  public static async boot(): Promise<void> {
    console.clear();
    const steps = [
      "Initializing KERNEL [v4.1.0-AEGIS]...",
      "Mounting File System /dev/hx01...",
      "Loading Drivers: [NET] [CRYPTO] [AI] [VIRT]",
      "Verifying Integrity Checks...",
      "Establishing Secure Uplink (VPN)...",
      "Syncing with Threat Intelligence Feeds...",
      "Decrypting user profile...",
      "Starting SECURITY INTELLIGENCE PLATFORM...",
    ];

    for (const step of steps) {
      await SimulationUtils.sleep(400);
      console.log(colors.green(` [OK] ${step}`));
    }

    await SimulationUtils.progressBar(" SYSTEM BOOT ", 1500);
    await SimulationUtils.sleep(500);
  }
}
