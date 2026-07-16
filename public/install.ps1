# OpenBean Server Installer - Windows launcher.
#
# The Windows entry point. Mirrors server-install.sh
# for POSIX. The user runs:
#
#   irm https://openbean.xyz/server-install.ps1 | iex
#
# (also served at https://openbean.xyz/install.ps1 -
# the two URLs carry the same script).

$ErrorActionPreference = "Stop"

# Resolve the version: explicit env wins; else ask the releases repo
# for the latest published tag; else fall back to the last-known
# release. A new release then ships by TAG ALONE - no launcher edit.
$OPENBEAN_VERSION = $env:OPENBEAN_VERSION
if (-not $OPENBEAN_VERSION) {
  try {
    $rel = Invoke-RestMethod -Uri "https://api.github.com/repos/openbean/openbean-releases/releases/latest" -Headers @{ "User-Agent" = "openbean-installer" } -ErrorAction Stop
    $OPENBEAN_VERSION = ($rel.tag_name -replace '^v', '')
  } catch { }
}
if (-not $OPENBEAN_VERSION) { $OPENBEAN_VERSION = "1.0.2-alpha" }
$BUNDLE_URL = if ($env:OPENBEAN_BUNDLE_URL) { $env:OPENBEAN_BUNDLE_URL } else { "https://github.com/openbean/openbean-releases/releases/download/v$OPENBEAN_VERSION/openbean-server-bundle-v$OPENBEAN_VERSION.tar.gz" }
$INSTALL_DIR = if ($env:OPENBEAN_INSTALL_DIR) { $env:OPENBEAN_INSTALL_DIR } else { "$env:ProgramFiles\OpenBean" }

function Write-Banner($msg) {
  Write-Host ""
  Write-Host "  $msg" -ForegroundColor Green
}

function Write-Info($msg) {
  Write-Host "  $msg" -ForegroundColor DarkGray
}

function Write-Err($msg) {
  Write-Host "  $msg" -ForegroundColor Red
}

Write-Banner "OpenBean Server v$OPENBEAN_VERSION - installer launcher"
Write-Info "Platform: windows"
Write-Info "Bundle:   $BUNDLE_URL"
Write-Info "Target:   $INSTALL_DIR"

# Check for admin.
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
  Write-Err "This installer needs Administrator. Re-run from an elevated PowerShell."
  exit 1
}

$work = Join-Path $env:TEMP "openbean-server-install-$(Get-Random)"
New-Item -ItemType Directory -Path $work | Out-Null

try {
  Write-Info "Downloading bundle ..."
  Invoke-WebRequest -Uri $BUNDLE_URL -OutFile (Join-Path $work "bundle.tar.gz") -UseBasicParsing
  Write-Banner "Downloaded."

  Write-Info "Extracting bundle ..."
  # tar.exe ships with Windows 10 1803+.
  tar -xzf (Join-Path $work "bundle.tar.gz") -C $work
  $bundleRoot = Get-ChildItem -Path $work -Directory | Select-Object -First 1
  if (-not (Test-Path (Join-Path $bundleRoot.FullName "server-installer"))) {
    Write-Err "Bundle is missing the server-installer/ directory."
    exit 1
  }
  Write-Banner "Bundle extracted."

  Write-Info "Running openbean-server install ..."
  Write-Host ""
  & node "$($bundleRoot.FullName)\server-installer\bin\openbean-server.mjs" install @args
} finally {
  Remove-Item -Recurse -Force $work -ErrorAction SilentlyContinue
}
