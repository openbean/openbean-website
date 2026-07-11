#!/usr/bin/env bash
# OpenBean installer — Ubuntu / Ubuntu WSL (V18).
#
# Optimized for the V18 target: a brand-new Ubuntu (or Ubuntu
# WSL) machine with nothing installed. Detects WSL, installs
# every prerequisite via apt (no brew, no manual downloads),
# clones the repo, brings up the local stack, opens the
# browser, and offers to start the HTTPS tunnel.
#
# Usage:
#   curl -fsSL https://openbean.xyz/install-ubuntu.sh | bash
#
# NOTE: this is a source-checkout (developer-style) install.
# For the production install — a system service, managed
# prerequisites, no source checkout — use:
#   curl -fsSL https://openbean.xyz/install | bash
# Both end at the same place: the browser is on the setup wizard.

set -euo pipefail

REPO_URL="https://github.com/openbean/openbean.git"
INSTALL_DIR="${OPENBEAN_INSTALL_DIR:-$HOME/openbean}"
APP_PORT="${OPENBEAN_APP_PORT:-3000}"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
info() { printf '  \033[2m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }
err()  { printf '  \033[31m✗\033[0m %s\n' "$1"; }
step() { printf '\n\033[1m[%d/%d] %s\033[0m\n' "$1" "$2" "$3"; }

prompt_continue() {
  if { exec 3<>/dev/tty; } 2>/dev/null; then
    read -rp "$1 " _ <&3
    exec 3<&-
  else
    printf '%s (no interactive terminal — continuing)\n' "$1"
  fi
}

# Detect the actual OS once. /etc/os-release is the modern,
# portable source; `lsb_release` is deprecated on Ubuntu 24+.
if [ ! -f /etc/os-release ]; then
  err "This installer targets Ubuntu. /etc/os-release not found."
  echo "  For macOS, Windows, or other Linux: use the generic installer:"
  echo "    curl -fsSL https://openbean.xyz/install | bash"
  exit 1
fi
. /etc/os-release
if [ "${ID:-}" != "ubuntu" ] && [ "${ID_LIKE:-}" != "debian" ]; then
  err "This installer targets Ubuntu. Detected: ${PRETTY_NAME:-unknown}."
  echo "  For other Linux: use the generic installer:"
  echo "    curl -fsSL https://openbean.xyz/install | bash"
  exit 1
fi

# WSL detection. On WSL we can't start the docker daemon via
# systemctl; we instruct the user to use Docker Desktop's WSL
# integration or to install podman.
IS_WSL=false
if [ -f /proc/sys/kernel/osrelease ] && grep -qi 'microsoft\|wsl' /proc/sys/kernel/osrelease 2>/dev/null; then
  IS_WSL=true
fi

bold "OpenBean installer (Ubuntu${IS_WSL:+ WSL})"
echo "A governed memory layer for AI tools — self-hosted, one command."
echo "Ubuntu: ${VERSION:-unknown}${IS_WSL:+ (WSL detected)}"
echo

# --- step 1/8: sudo -------------------------------------------------------------------
step 1 8 "Checking permissions"
if [ "$(id -u)" -eq 0 ]; then
  ok "Running as root"
  SUDO=""
elif command -v sudo >/dev/null 2>&1; then
  ok "sudo available"
  SUDO="sudo"
else
  err "This installer needs root to install prerequisites. Install sudo, or run as root."
  exit 1
fi

# --- step 2/8: system packages --------------------------------------------------------
step 2 8 "Installing system packages"
PACKAGES_TO_INSTALL=()
for pkg in curl git ca-certificates gnupg; do
  if ! dpkg -s "$pkg" >/dev/null 2>&1; then
    PACKAGES_TO_INSTALL+=("$pkg")
  fi
done
if [ ${#PACKAGES_TO_INSTALL[@]} -gt 0 ]; then
  info "apt install: ${PACKAGES_TO_INSTALL[*]}"
  $SUDO apt-get update -qq
  $SUDO apt-get install -y -qq "${PACKAGES_TO_INSTALL[@]}"
fi
ok "curl, git, ca-certificates present"

# --- step 3/8: Node.js 22+ -------------------------------------------------------------
step 3 8 "Installing Node.js 22+"
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]; then
  info "Adding NodeSource repo and installing Node.js 22"
  $SUDO mkdir -p /etc/apt/keyrings
  # NodeSource serves this key ASCII-armored (plain text); apt's
  # signed-by= needs a binary keyring. Piping straight to tee (as an
  # earlier version of this script did) writes an armored text file
  # that apt can't verify against — every install hit
  # "NO_PUBKEY ... not signed" here. gpg --dearmor converts it.
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | $SUDO gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  $SUDO chmod a+r /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | $SUDO tee /etc/apt/sources.list.d/nodesource.list >/dev/null
  $SUDO apt-get update -qq
  $SUDO apt-get install -y -qq nodejs
fi
ok "Node.js $(node -v)"

# --- step 4/8: Podman (preferred) or Docker -------------------------------------------
step 4 8 "Installing container runtime"
RUNTIME=""
if command -v podman >/dev/null 2>&1 && podman ps >/dev/null 2>&1; then
  RUNTIME="podman"
  ok "Podman present and daemon reachable"
elif command -v docker >/dev/null 2>&1 && docker ps >/dev/null 2>&1; then
  RUNTIME="docker"
  ok "Docker present and daemon reachable"
else
  info "Installing Podman + podman-docker (the OpenBean tooling calls 'docker', so the package is required alongside Podman itself on Ubuntu)"
  $SUDO apt-get install -y -qq podman podman-docker
  if $IS_WSL; then
    # On WSL, the podman socket is set up by the systemd service.
    $SUDO systemctl enable --now podman.socket 2>/dev/null || true
  fi
  if podman ps >/dev/null 2>&1; then
    RUNTIME="podman"
    ok "Podman installed and running"
  elif docker ps >/dev/null 2>&1; then
    RUNTIME="docker"
    ok "Docker (via podman-docker shim) running"
  else
    err "Container runtime installed but the daemon is not reachable."
    if $IS_WSL; then
      echo "  On WSL, the Podman socket needs Docker Desktop's WSL integration"
      echo "  (Settings → Resources → WSL Integration) to be enabled, or the"
      echo "  systemd service running:"
      echo "    sudo systemctl enable --now podman.socket"
    else
      echo "  On native Ubuntu, start the Podman socket:"
      echo "    sudo systemctl enable --now podman.socket"
    fi
    exit 1
  fi
fi

# --- step 5/8: cloudflared ------------------------------------------------------------
step 5 8 "Installing cloudflared (for the HTTPS tunnel)"
# We don't strictly require cloudflared here — the operator
# can run `npm run tunnel` later and the script downloads it
# on demand. But installing it now is one less thing to do
# later, and the V18 brief says "remove every step."
if ! command -v cloudflared >/dev/null 2>&1; then
  info "Adding Cloudflare's apt repo and installing cloudflared"
  $SUDO mkdir -p --mode=0755 /usr/share/keyrings
  curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | $SUDO tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
  echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs 2>/dev/null || echo jammy) main" | $SUDO tee /etc/apt/sources.list.d/cloudflared.list >/dev/null
  $SUDO apt-get update -qq 2>/dev/null || true
  $SUDO apt-get install -y -qq cloudflared 2>/dev/null || {
    # Fallback: the tunnel script will download the binary on first use.
    warn "cloudflared apt install failed — the tunnel script will download it on first use."
  }
fi
if command -v cloudflared >/dev/null 2>&1; then
  ok "cloudflared $(cloudflared --version 2>&1 | head -n1)"
fi

# --- step 6/8: OpenBean checkout ------------------------------------------------------
step 6 8 "Cloning OpenBean"
if [ -f "package.json" ] && grep -q '"name": *"openbean"' package.json 2>/dev/null; then
  ok "Already inside an OpenBean checkout"
else
  if [ -d "$INSTALL_DIR/.git" ]; then
    info "Updating existing checkout at $INSTALL_DIR"
    git -C "$INSTALL_DIR" pull --ff-only
  else
    info "Cloning to $INSTALL_DIR"
    git clone "$REPO_URL" "$INSTALL_DIR"
  fi
  cd "$INSTALL_DIR"
fi

# --- step 7/8: install + bring up ----------------------------------------------------
step 7 8 "Installing dependencies + starting OpenBean"
npm install
ok "Dependencies installed"
npm run dev:up &
DEV_PID=$!
# npm run dev:up is foreground; the tunnel step happens after it returns.
wait $DEV_PID || true

# --- step 8/8: HTTPS tunnel -----------------------------------------------------------
step 8 8 "HTTPS tunnel (so teammates on other machines can reach this box)"
echo
echo "  OpenBean is running at http://localhost:$APP_PORT."
echo "  The browser is open on the setup wizard. Finish setup there."
echo
echo "  When your teammates need to reach this box from another machine,"
echo "  start a quick HTTPS tunnel:"
echo
echo "    npm run tunnel"
echo
echo "  It prints a https://*.trycloudflare.com URL anyone can use."
echo
if { exec 3<>/dev/tty; } 2>/dev/null; then
  read -rp "Start the tunnel now? [Y/n] " _answer <&3
  exec 3<&-
  case "${_answer:-y}" in
    [Yy]*)
      echo
      bold "Starting the HTTPS tunnel..."
      exec npm run tunnel
      ;;
    *)
      echo
      echo "  Skipped. Run \`npm run tunnel\` from $INSTALL_DIR when you want it."
      ;;
  esac
fi
