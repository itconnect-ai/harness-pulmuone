import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";

const FORMATTABLE_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
]);

function readHookInput() {
  const input = readFileSync(0, "utf8").trim();
  return input ? JSON.parse(input) : {};
}

function shouldFormat(filePath) {
  const normalized = filePath.replaceAll("\\", "/");

  if (
    normalized.includes("/node_modules/") ||
    normalized.includes("/.next/") ||
    normalized.endsWith("pnpm-lock.yaml")
  ) {
    return false;
  }

  const extension = normalized.slice(normalized.lastIndexOf(".")).toLowerCase();
  return FORMATTABLE_EXTENSIONS.has(extension);
}

try {
  const payload = readHookInput();
  const filePath = payload.tool_input?.file_path ?? payload.tool_input?.path;

  if (typeof filePath !== "string" || !existsSync(filePath) || !statSync(filePath).isFile()) {
    process.exit(0);
  }

  if (!shouldFormat(filePath)) {
    process.exit(0);
  }

  const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  const result = spawnSync(pnpm, ["prettier", "--write", filePath], {
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || `Prettier failed for ${filePath}`);
  }
} catch (error) {
  console.error(`Prettier hook failed: ${error instanceof Error ? error.message : error}`);
}
