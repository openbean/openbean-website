#!/usr/bin/env node
// Validate every internal href, image src, and import in the bundle.
// Emits a pass/fail report. Exits non-zero on any failure.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const TEXT_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".md", ".mdx", ".json", ".css", ".html", ".txt", ".xml"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".turbo", "out", "dist", ".vercel", ".git"]);

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && TEXT_EXTS.has(path.extname(e.name))) yield p;
  }
}

const findings = [];
function failLocal(file, msg) { findings.push({ file, msg }); }

const HREF_RE = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;
const IMPORT_RE = /\b(?:import|from)\s*["']([^"']+)["']/g;

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith("node_modules/")) continue;
  const txt = await fs.readFile(file, "utf8");
  let m;
  while ((m = HREF_RE.exec(txt))) {
    const v = m[1];
    if (!v) continue;
    if (v.startsWith("http://") || v.startsWith("https://") || v.startsWith("mailto:") || v.startsWith("tel:") || v.startsWith("data:") || v.startsWith("javascript:")) continue;
    // Same-page anchors (#foo) and root-page anchors (/#foo) are valid; the
    // anchor target is the page itself, not a separate file.
    if (v === "#" || v.startsWith("#")) continue;
    if (v.startsWith("/#")) continue;
    if (v.startsWith("/")) {
      // For site-root links, drop any trailing slash and any query/hash.
      const cleaned = v.split("#")[0].split("?")[0].replace(/\/$/, "");
      const candidates = [
        path.join(ROOT, "app", cleaned, "page.tsx"),
        path.join(ROOT, "app", cleaned, "page.ts"),
        path.join(ROOT, "app", cleaned + ".tsx"),
        path.join(ROOT, "public", cleaned),
      ];
      let ok = false;
      for (const c of candidates) {
        try { await fs.access(c); ok = true; break; } catch {}
      }
      if (!ok) failLocal(rel, `site-root link '${v}' does not resolve`);
    } else {
      const base = path.dirname(file);
      const target = path.resolve(base, v.split("#")[0].split("?")[0]);
      try { await fs.access(target); } catch { failLocal(rel, `relative link '${v}' does not resolve`); }
    }
  }
  HREF_RE.lastIndex = 0;
  while ((m = IMPORT_RE.exec(txt))) {
    const v = m[1];
    if (!v) continue;
    if (v.startsWith("@openbean/")) continue;
    if (v.startsWith(".") || v.startsWith("/")) {
      const base = path.dirname(file);
      const stripped = v.split("#")[0].split("?")[0];
      const candidates = [
        path.resolve(base, stripped),
        path.resolve(base, stripped + ".ts"),
        path.resolve(base, stripped + ".tsx"),
        path.resolve(base, stripped + ".js"),
        path.resolve(base, stripped + ".jsx"),
        path.resolve(base, stripped + ".mjs"),
        path.resolve(base, stripped, "index.ts"),
        path.resolve(base, stripped, "index.tsx"),
      ];
      let ok = false;
      for (const c of candidates) {
        try { await fs.access(c); ok = true; break; } catch {}
      }
      if (!ok) failLocal(rel, `import '${v}' does not resolve`);
    }
  }
  IMPORT_RE.lastIndex = 0;
}

if (findings.length === 0) {
  console.log("✓ all internal links, images, and imports resolve");
  process.exit(0);
} else {
  console.error(`✗ ${findings.length} unresolved link(s):`);
  for (const f of findings) console.error(`  ${f.file}: ${f.msg}`);
  process.exit(1);
}
