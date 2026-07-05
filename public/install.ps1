# OpenBean installer (Windows) — https://github.com/openbean/openbean
#
# Detects Node.js/git/a container runtime, gets you a checkout, installs
# dependencies, and brings up your instance -- ending with your browser open on
# the guided setup wizard. Matches docs/specs/006-installation-and-developer-
# experience.md's Advanced Mode: this runs `npm run dev:up` against a real
# source checkout, the same fully-working path the README's own Quickstart
# already documents -- this script only automates getting there.
#
# Usage:
#   irm https://openbean.xyz/install.ps1 | iex
#
# V9 upgrade (2026-07-04): added detection for the container-runtime daemon
# (was: the binary; is: the binary AND that it can answer `docker ps`), the
# port 3000 collision, and a WSL2 distribution check. The script never
# leaves the user with an unexplained failure: every detected problem names
# the cause and the recovery command.

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/openbean/openbean.git"
$InstallDir = if ($env:OPENBEAN_INSTALL_DIR) { $env:OPENBEAN_INSTALL_DIR } else { Join-Path $HOME "openbean" }
$AppPort = if ($env:OPENBEAN_APP_PORT) { [int]$env:OPENBEAN_APP_PORT } else { 3000 }

function Write-Bold($Text) { Write-Host $Text -ForegroundColor White }
function Write-Info($Text) { Write-Host "  $Text" -ForegroundColor DarkGray }
function Write-Ok($Text) { Write-Host "  [ok] $Text" -ForegroundColor Green }
function Write-Warn($Text) { Write-Host "  [!] $Text" -ForegroundColor Yellow }
function Write-Err($Text) { Write-Host "  [x] $Text" -ForegroundColor Red }

# Returns $true if the given TCP port is free on localhost. Uses
# System.Net.Sockets.TcpListener; no external dependency.
function Test-Port-Free {
  param([int]$Port)
  $listener = $null
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
    $listener.Start()
    return $true
  } catch {
    return $false
  } finally {
    if ($listener) { $listener.Stop() }
  }
}

Write-Host ""
Write-Bold "OpenBean installer"
Write-Host "A governed, append-only memory layer for AI-powered teams -- self-hosted, permanently."
Write-Host ""

# --- 1. WSL2 check -----------------------------------------------------------------------
# Both supported Windows runtimes (Docker Desktop, Podman Desktop) need WSL2. Enabling it
# requires a reboot -- a line this installer does not cross unattended (Spec 006 Sec3).
$wslStatus = wsl --status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Err "WSL2 is required for a container runtime on Windows and doesn't appear to be"
  Write-Host "  enabled. Run this in an elevated PowerShell, reboot, then re-run this installer:"
  Write-Host "    wsl --install"
  exit 1
}
Write-Ok "WSL2: available."

# --- 2. Node.js (22+) --------------------------------------------------------------------
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host ""
  Write-Err "Node.js 22 or newer is required and wasn't found."
  Write-Host "  Install it from https://nodejs.org, then re-run:"
  Write-Host "    irm https://openbean.xyz/install.ps1 | iex"
  exit 1
}
$nodeVersion = (node --version).TrimStart("v")
$nodeMajor = [int]($nodeVersion.Split(".")[0])
if ($nodeMajor -lt 22) {
  Write-Err "Node.js 22+ is required -- found v$nodeVersion. Please upgrade and re-run this installer."
  exit 1
}
Write-Ok "Node.js v$nodeVersion found."

# --- 3. git --------------------------------------------------------------------------------
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Err "git is required and wasn't found. Install it, then re-run this installer."
  exit 1
}
$gitVersion = (git --version) -replace "git version ", ""
Write-Ok "git $gitVersion found."

# --- 4. Container runtime -- Podman preferred, Docker fine, guide if neither ---------------
$runtime = $null
if (Get-Command podman -ErrorAction SilentlyContinue) {
  $runtime = "podman"
} elseif (Get-Command docker -ErrorAction SilentlyContinue) {
  $runtime = "docker"
}

if (-not $runtime) {
  Write-Host ""
  Write-Err "No container runtime found. OpenBean's local stack (Postgres, Auth, PostgREST)"
  Write-Host "  needs Podman or Docker."
  Write-Host "    Install Docker Desktop: https://www.docker.com/products/docker-desktop"
  Write-Host "    or Podman Desktop:      https://podman-desktop.io"
  Write-Host ""
  Read-Host "Press Enter once installed to continue (Ctrl+C to stop here)"
  if (Get-Command podman -ErrorAction SilentlyContinue) {
    $runtime = "podman"
  } elseif (Get-Command docker -ErrorAction SilentlyContinue) {
    $runtime = "docker"
  } else {
    Write-Err "Still no runtime found. Install one, then re-run this installer."
    exit 1
  }
}

# V9: verify the runtime binary is more than installed — verify the *daemon*
# answers. `docker --version` succeeding while the daemon is down is a real,
# silent-failure mode. Detect it now, not five minutes in.
$runtimeOk = $false
try { & $runtime ps 2>&1 | Out-Null; $runtimeOk = ($LASTEXITCODE -eq 0) } catch { $runtimeOk = $false }
if (-not $runtimeOk) {
  Write-Err "Container runtime '$runtime' is installed but its daemon is not responding."
  Write-Host "  On Windows, the container runtime (Docker Desktop or Podman Desktop) needs to"
  Write-Host "  be running. Open the desktop app, wait for the indicator to settle, then re-run."
  if ($runtime -eq "docker") {
    Write-Host "  Note: if a Docker context isn't already pointed at a running engine,"
    Write-Host "  `docker context use default` may be needed -- see the README's Podman note."
  }
  exit 1
}
Write-Ok "Container runtime: $runtime (daemon reachable)"
if ($runtime -eq "docker") {
  Write-Info "Note: if a Docker context isn't already pointed at a running engine, `docker context use default` may be needed -- see the README's Podman note."
}

# --- 4b. V9: port 3000 already in use --------------------------------------------------
# The Next.js application serves on port 3000 by default. If something else is
# already bound there (another dev server, a previous openbean instance that
# didn't shut down cleanly, a corporate proxy), the bring-up will either fail
# or silently use a different port. Detect it now and name the cause.
if (-not (Test-Port-Free -Port $AppPort)) {
  Write-Err "Port $AppPort is already in use. OpenBean's web application needs that port."
  Write-Host "  Common causes: another dev server, a leftover openbean instance, a corporate"
  Write-Host "  proxy. Find the process with:"
  Write-Host "    netstat -ano | findstr :$AppPort"
  Write-Host "  Then stop it (or set OPENBEAN_APP_PORT to a free port and re-run this installer)."
  exit 1
}
Write-Ok "Port $AppPort is free."

# --- 5. Get a checkout -----------------------------------------------------------------------
$inCheckout = (Test-Path "package.json") -and ((Get-Content "package.json" -Raw) -match '"name"\s*:\s*"openbean"')
if ($inCheckout) {
  Write-Host ""
  Write-Host "Already inside an OpenBean checkout -- using this directory."
} else {
  Write-Host ""
  if (Test-Path (Join-Path $InstallDir ".git")) {
    Write-Host "Found an existing checkout at $InstallDir -- updating it."
    git -C $InstallDir pull --ff-only
  } else {
    Write-Host "Cloning OpenBean into $InstallDir..."
    git clone $RepoUrl $InstallDir
  }
  Set-Location $InstallDir
}

# --- 6. Install + bring up --------------------------------------------------------------------
Write-Host ""
Write-Bold "Installing dependencies (this can take a minute)..."
npm install

Write-Host ""
Write-Bold "Starting your instance..."
Write-Host "This brings up the local stack, generates your configuration, and opens your"
Write-Host "browser on the guided setup wizard -- nothing left to configure by hand."
npm run dev:up
