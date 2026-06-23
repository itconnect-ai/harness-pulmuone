# Claude Code Hooks

This repo includes minimal project-level hooks in `.claude/settings.json`.

## Included Hooks

1. `PreToolUse`: blocks direct access to likely secret files such as `.env`, `.env.local`, `secrets/**`, `private/**`, and private key files.
2. `PostToolUse`: runs Prettier on edited format-friendly files.

## Why This Is Minimal

Hooks should enforce mechanical safety rules, not replace engineering judgment. This repo starts with secret protection and formatting because both are deterministic and low-noise.

Add stronger hooks only after repeated failures justify them.
