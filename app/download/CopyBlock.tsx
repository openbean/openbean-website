"use client";

import { useState } from "react";

// A code block with a one-click Copy button, so the install / verify commands
// on the download page are copy-pasteable instead of hand-selected. Client
// component (the clipboard API is browser-only). No network access, so it is
// unaffected by any host content policy.
export function CopyBlock({ code, ariaLabel }: { code: string; ariaLabel?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — no-op; the text is
      // still selectable inside the <pre>.
    }
  }

  return (
    <div className="ob-copy-wrap">
      <button
        type="button"
        className="ob-copy-btn"
        data-copied={copied}
        onClick={copy}
        aria-label={ariaLabel ?? "Copy to clipboard"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
