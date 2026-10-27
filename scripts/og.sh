#!/usr/bin/env bash
# Renders scripts/og.html to static/og.png (1200x630) with headless Chromium.
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
chromium --headless=new --disable-gpu --hide-scrollbars \
    --allow-file-access-from-files --virtual-time-budget=3000 \
    --window-size=1200,630 \
    --screenshot="$root/static/og.png" \
    "file://$root/scripts/og.html"
