// Forbidden-terms audit over user-visible website copy — the same
// enforcement hook as the engine repo's scripts/check-copy.mjs (see
// docs/product/TERMINOLOGY.md there): a JSX-text-node-scoped grep, not a
// whole-file grep, so code identifiers never false-positive.
//
// Scans app/**/*.tsx for engine vocabulary appearing in what a visitor
// actually reads: JSX text nodes and user-facing string props (title,
// aria-label, placeholder, alt, label). The website sells outcomes in
// plain language; engine vocabulary in visible copy is a build failure.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app"];

// Banned as standalone words, case-insensitive.
const BANNED = ["tenant", "tenants", "principal", "principals", "jwt", "rls", "embedding", "embeddings"];
// Banned as substrings anywhere in visible text.
const BANNED_FRAGMENTS = ["_meta.", "ai_identities", "current_belief", "pending_review", "quarantined", "supabase", "vector database", "knowledge graph"];

function tsxFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...tsxFiles(path));
    else if (entry.name.endsWith(".tsx")) out.push(path);
  }
  return out;
}

// Extract user-visible strings: JSX text nodes (>text<) and named string props.
function visibleStrings(sourceText) {
  const found = [];
  for (const m of sourceText.matchAll(/>([^<>{}]+)</g)) {
    const text = m[1].trim();
    if (text) found.push({ text, at: m.index });
  }
  for (const m of sourceText.matchAll(/\b(?:title|aria-label|placeholder|alt|label)=["']([^"']+)["']/g)) {
    found.push({ text: m[1], at: m.index });
  }
  return found;
}

function lineOf(sourceText, index) {
  return sourceText.slice(0, index).split("\n").length;
}

const violations = [];
for (const root of ROOTS) {
  let files = [];
  try {
    files = tsxFiles(root);
  } catch {
    continue; // a root may not exist yet
  }
  for (const file of files) {
    const sourceText = readFileSync(file, "utf8");
    for (const { text, at } of visibleStrings(sourceText)) {
      const lower = text.toLowerCase();
      for (const word of BANNED) {
        if (new RegExp(`\\b${word}\\b`, "i").test(text)) {
          violations.push(`${file}:${lineOf(sourceText, at)} — banned word "${word}" in visible copy: "${text.slice(0, 80)}"`);
        }
      }
      for (const fragment of BANNED_FRAGMENTS) {
        if (lower.includes(fragment)) {
          violations.push(`${file}:${lineOf(sourceText, at)} — banned fragment "${fragment}" in visible copy: "${text.slice(0, 80)}"`);
        }
      }
    }
  }
}

if (violations.length > 0) {
  console.error("✗ Engine vocabulary leaked into user-visible copy:\n");
  for (const v of violations) console.error(`  ${v}`);
  process.exit(1);
}
console.log("✓ no banned engine vocabulary in user-visible copy (app/ JSX text + string props)");
