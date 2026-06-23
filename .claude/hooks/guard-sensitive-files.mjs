import { readFileSync } from "node:fs";
import path from "node:path";

function readHookInput() {
  const input = readFileSync(0, "utf8").trim();
  return input ? JSON.parse(input) : {};
}

function normalize(value) {
  return value.replaceAll("\\", "/").toLowerCase();
}

function isSensitivePath(filePath) {
  const normalized = normalize(filePath);
  const base = path.posix.basename(normalized);

  if (base === ".env" || (base.startsWith(".env.") && base !== ".env.example")) {
    return true;
  }

  return (
    normalized.includes("/secrets/") ||
    normalized.includes("/private/") ||
    /\.(pem|p8|p12|key)$/i.test(normalized)
  );
}

function commandTouchesSensitiveFile(command) {
  const normalized = normalize(command);
  const sensitiveFilePattern =
    /(^|[\s"'`])(?:\.env(?:\.(?!example\b)[a-z0-9_-]+)?|[^ "'`]*\.(?:pem|p8|p12|key))($|[\s"'`])/i;
  const sensitiveDirectoryPattern = /(^|[\s"'`])(?:\.\/)?(?:secrets|private)\//i;
  const riskyVerbPattern =
    /\b(cat|type|get-content|gc|more|less|head|tail|sed|awk|python|node|copy|cp|move|mv|git\s+add)\b/i;

  return (
    riskyVerbPattern.test(normalized) &&
    (sensitiveFilePattern.test(normalized) || sensitiveDirectoryPattern.test(normalized))
  );
}

try {
  const payload = readHookInput();
  const toolInput = payload.tool_input ?? {};
  const filePath = toolInput.file_path ?? toolInput.path;
  const command = toolInput.command;

  if (typeof filePath === "string" && isSensitivePath(filePath)) {
    console.error(
      `Blocked access to sensitive file: ${filePath}. Use .env.example for templates and keep real secrets outside committed files.`,
    );
    process.exit(2);
  }

  if (typeof command === "string" && commandTouchesSensitiveFile(command)) {
    console.error(
      "Blocked shell command that appears to read, copy, or stage a sensitive file. Use .env.example for templates.",
    );
    process.exit(2);
  }
} catch (error) {
  console.error(`Sensitive-file hook failed: ${error instanceof Error ? error.message : error}`);
  process.exit(0);
}
