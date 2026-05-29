import { rmSync, existsSync } from "fs";
import { join } from "path";

const nextDir = join(process.cwd(), ".next");

if (!existsSync(nextDir)) {
  console.log("No .next folder to remove");
  process.exit(0);
}

try {
  rmSync(nextDir, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 300,
  });
  console.log("Removed .next cache");
} catch (error) {
  console.error("\nCould not remove .next (OneDrive or a running server may be locking files).");
  console.error("1. Stop all Node: Get-Process node | Stop-Process -Force");
  console.error("2. Run: npm run clean");
  console.error("3. Or delete the .next folder manually\n");
  console.error(error.message);
  process.exit(1);
}
