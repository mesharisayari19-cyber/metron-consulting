import { existsSync } from "fs";
import { join } from "path";

const buildId = join(process.cwd(), ".next", "BUILD_ID");

if (!existsSync(buildId)) {
  console.error("\nError: Production build not found.");
  console.error("Run: npm run build\n");
  console.error("For local development use: npm run dev\n");
  process.exit(1);
}
