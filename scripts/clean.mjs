import { rmSync, existsSync } from "fs";
import { join } from "path";

const targets = [".next", join("node_modules", ".cache")];
let removed = 0;

for (const rel of targets) {
  const dir = join(process.cwd(), rel);
  if (!existsSync(dir)) continue;

  try {
    rmSync(dir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 300,
    });
    console.log(`Removed ${rel}`);
    removed += 1;
  } catch (error) {
    console.error(`\nCould not remove ${rel} (OneDrive or a running server may be locking files).`);
    console.error("1. Stop all Node: Get-Process node | Stop-Process -Force");
    console.error("2. Run: npm run clean");
    console.error("3. Or delete the folder manually\n");
    console.error(error.message);
    process.exit(1);
  }
}

if (removed === 0) {
  console.log("No cache folders to remove");
}
