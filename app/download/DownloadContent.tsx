"use client";

// The download page body. The version + installer list start from the
// build-time manifest (public/downloads/latest.json) so the first paint has
// content and works offline, then a CLIENT-SIDE fetch of GitHub's
// releases/latest overrides it on mount. That is what keeps this page aligned
// with the newest release WITHOUT editing the site or redeploying per release:
// the site is a static export, so there is no server/ISR to revalidate on, but
// GitHub always points releases/latest at the newest published release and its
// API is CORS-enabled, so a browser fetch is always current. If the fetch fails
// (offline, rate-limited), the build-time manifest stands in.

import { useEffect, useState } from "react";
import { CopyBlock } from "./CopyBlock";

const RELEASES_API = "https://api.github.com/repos/openbean/openbean-releases/releases/latest";

export interface ReleaseArtifact {
  name: string;
  sha256: string;
  size: number;
  os: string;
  format: string;
}

export interface ReleaseManifest {
  version?: string;
  channel?: string;
  released_at?: string | null;
  artifacts?: ReleaseArtifact[];
}

const PLATFORM_LABELS: Record<string, string> = {
  "windows.exe": "Windows installer (.exe)",
  "windows.msi": "Windows installer (.msi)",
  "ubuntu.deb": "Ubuntu / Debian (.deb)",
  "linux.appimage": "Linux AppImage",
  "darwin.pkg": "macOS installer (.pkg)",
  "darwin.dmg": "macOS disk image (.dmg)",
  "windows-connect.msi": "OpenBean Connect for Windows (.msi)",
  "windows-connect.exe": "OpenBean Connect for Windows (.exe)",
  "darwin-connect.dmg": "OpenBean Connect for macOS (.dmg)",
  "ubuntu-connect.deb": "OpenBean Connect for Ubuntu (.deb)",
  "linux-connect.appimage": "OpenBean Connect for Linux (AppImage)",
};

function classifyAsset(name: string): { os: string; format: string } {
  const n = name.toLowerCase();
  const connect = n.includes("connect");
  let os = "unknown";
  let format = "bin";
  if (n.endsWith(".exe")) { os = "windows"; format = "exe"; }
  else if (n.endsWith(".msi")) { os = "windows"; format = "msi"; }
  else if (n.endsWith(".deb")) { os = "ubuntu"; format = "deb"; }
  else if (n.endsWith(".pkg")) { os = "darwin"; format = "pkg"; }
  else if (n.endsWith(".dmg")) { os = "darwin"; format = "dmg"; }
  else if (n.endsWith(".appimage")) { os = "linux"; format = "appimage"; }
  return { os: connect ? `${os}-connect` : os, format };
}

function manifestFromApi(j: {
  tag_name?: string;
  published_at?: string;
  assets?: Array<{ name: string; size: number }>;
}): ReleaseManifest | null {
  const tag = typeof j.tag_name === "string" ? j.tag_name : "";
  if (!tag) return null;
  const channelMatch = tag.match(/alpha|beta|rc/i);
  const artifacts = (j.assets ?? [])
    .filter((a) => /\.(exe|msi|deb|pkg|dmg|appimage)$/i.test(a.name))
    .map((a) => ({ name: a.name, size: a.size, sha256: "", ...classifyAsset(a.name) }));
  return {
    version: tag.replace(/^v/, ""),
    channel: channelMatch ? channelMatch[0].toLowerCase() : "stable",
    released_at: j.published_at ?? null,
    artifacts,
  };
}

export function DownloadContent({ initial }: { initial: ReleaseManifest }) {
  const [release, setRelease] = useState<ReleaseManifest>(initial);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(RELEASES_API, { headers: { accept: "application/vnd.github+json" } });
        if (!res.ok) return;
        const mapped = manifestFromApi(await res.json());
        if (mapped && !cancelled) setRelease(mapped);
      } catch {
        // Keep the build-time manifest.
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const artifacts = release.artifacts ?? [];
  const serverArtifacts = artifacts.filter((a) => !a.os.includes("connect"));
  const connectArtifacts = artifacts.filter((a) => a.os.includes("connect"));

  return (
    <div className="ob-wrap ob-doc-wrap">
      <div className="ob-doc-hero">
        <p className="ob-eyebrow">Download</p>
        <h1 className="ob-h1">Install OpenBean on your own server.</h1>
        <p className="ob-lead">
          OpenBean runs on infrastructure you control — a server in your office, a machine in your
          data center, or a private cloud box. Nothing your team captures ever lives on ours.
          Installation takes one command and a few minutes.
        </p>
        {release.version && (
          <p className="ob-doc-meta">
            Latest release: <strong>v{release.version}</strong>
            {release.channel ? <> · {release.channel}</> : null}
            {release.released_at ? (
              <>
                {" "}
                ·{" "}
                <time dateTime={release.released_at}>
                  {new Date(release.released_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            ) : null}
          </p>
        )}
      </div>

      <section className="ob-doc-section">
        <h2 className="ob-h2">One command, on the machine you choose</h2>
        <p>
          Run the line for your platform in a terminal on the server. The installer checks the
          machine, sets OpenBean up as a system service, and opens the guided setup in your browser.
          You create your organization there — no account with us, no sign-up.
        </p>
        <h3 className="ob-h3">macOS / Linux</h3>
        <CopyBlock ariaLabel="Copy the macOS and Linux install command" code={`curl -fsSL https://openbean.xyz/install | bash`} />
        <p>
          No administrator access on the machine? Add <code>--user</code> to install under your own
          home directory instead:
        </p>
        <CopyBlock
          ariaLabel="Copy the no-administrator install command"
          code={`curl -fsSL https://openbean.xyz/install | bash -s -- --user`}
        />
        <h3 className="ob-h3">Windows (PowerShell, run as Administrator)</h3>
        <CopyBlock ariaLabel="Copy the Windows install command" code={`irm https://openbean.xyz/install.ps1 | iex`} />
        <h3 className="ob-h3">Fresh Ubuntu or Ubuntu on WSL</h3>
        <CopyBlock ariaLabel="Copy the Ubuntu install command" code={`curl -fsSL https://openbean.xyz/install-ubuntu.sh | bash`} />
        <p>
          Every script is a plain text file you can read before you run it — open the URL in a
          browser first if you want to see exactly what it does. That transparency is deliberate.
        </p>
      </section>

      {serverArtifacts.length > 0 ? (
        <section className="ob-doc-section">
          <h2 className="ob-h2">OpenBean Server installers</h2>
          <p>
            Prefer a native installer to a terminal? Download the package for your platform. It ends
            in the same place: the guided setup, in your browser, on your server.
          </p>
          <ArtifactList artifacts={serverArtifacts} />
        </section>
      ) : (
        <section className="ob-doc-section">
          <h2 className="ob-h2">Native installers</h2>
          <p>
            Point-and-click installers for Windows, macOS, Ubuntu, and Linux are built with every
            release. During the current private alpha they are delivered directly to evaluating
            teams rather than listed here. If your organization wants them, the{" "}
            <a href="/evaluation-program">evaluation program</a> is the door — a real person will set
            you up within one business day.
          </p>
        </section>
      )}

      {connectArtifacts.length > 0 && (
        <section className="ob-doc-section">
          <h2 className="ob-h2">OpenBean Connect</h2>
          <p>
            The desktop app that pairs your AI tools with your server in one click and keeps the
            connection alive in the background.
          </p>
          <ArtifactList artifacts={connectArtifacts} />
        </section>
      )}

      <section className="ob-doc-section">
        <h2 className="ob-h2">What happens after you install</h2>
        <ol>
          <li>
            <strong>Create your organization.</strong> The setup wizard opens in your browser and
            walks you through it — about two minutes.
          </li>
          <li>
            <strong>Connect your AI tools.</strong> Each teammate connects the tools they already
            use from the Connections page, in a couple of clicks.
          </li>
          <li>
            <strong>Stop losing what you learn.</strong> Important work is kept automatically, a
            person you choose approves what becomes company knowledge, and everyone gets the right
            answer from then on.
          </li>
        </ol>
      </section>

      <section className="ob-doc-section">
        <h2 className="ob-h2">Before you install</h2>
        <ul>
          <li>
            A machine your company controls: a spare server, a VPS, or a workstation that stays on.
            4&nbsp;GB of memory is comfortable.
          </li>
          <li>
            Administrator access on that machine (or use the <code>--user</code> option above).
          </li>
          <li>About ten minutes, start to finish.</li>
        </ul>
        <p>
          Not sure whether your setup fits? Ask us first — <a href="/contact">contact</a> reaches a
          real person, and the <a href="/faq">FAQ</a> answers the common questions.
        </p>
      </section>

      {serverArtifacts.length > 0 && (
        <section className="ob-doc-section">
          <h2 className="ob-h2">Verify your download</h2>
          <p>
            Every artifact ships with a SHA-256 checksum. Compare against the values in{" "}
            <code>checksums.txt</code> attached to the release:
          </p>
          <CopyBlock ariaLabel="Copy the checksum-verification command" code={`sha256sum <the file you downloaded>`} />
        </section>
      )}

      <div className="ob-doc-cta">
        <h2 className="ob-h2">Want help instead of a terminal?</h2>
        <p>
          <a className="ob-btn ob-btn-primary ob-btn-lg" href="/contact?intent=demo">
            Request an Enterprise Demo
          </a>{" "}
          <a className="ob-btn ob-btn-lg" href="/evaluation-program">
            Join the evaluation program
          </a>
        </p>
      </div>
    </div>
  );
}

function ArtifactList({ artifacts }: { artifacts: ReleaseArtifact[] }) {
  return (
    <ul className="ob-doc-artifacts">
      {artifacts.map((a) => {
        const key = `${a.os}.${a.format}`;
        return (
          <li key={a.name}>
            <a
              href={`https://github.com/openbean/openbean-releases/releases/latest/download/${a.name}`}
              rel="noopener"
            >
              {PLATFORM_LABELS[key] ?? a.name}
            </a>{" "}
            — {(a.size / 1024 / 1024).toFixed(1)} MB
            {a.sha256 ? (
              <>
                {" "}
                · <code>{a.sha256.slice(0, 16)}…</code>
              </>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
