import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const statusPath = join(process.cwd(), "STATUS.md");

if (!existsSync(statusPath)) {
  console.log("STATUS.md not found. Run the Claude Code planning workflow first.");
  process.exit(0);
}

const status = readFileSync(statusPath, "utf8");
const currentSection = status.match(/## Current[\s\S]*?(?=\n## |$)/);

console.log(currentSection ? currentSection[0].trim() : status.trim());
