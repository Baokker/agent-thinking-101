#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-4173}"
URL="http://127.0.0.1:${PORT}/site/"

if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi

open "$URL"
python3 -m http.server "$PORT" --bind 127.0.0.1
