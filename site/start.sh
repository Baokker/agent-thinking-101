#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-4173}"

echo "Starting Agent Thinking 101 site at http://127.0.0.1:${PORT}/site/"
echo "Press Ctrl+C to stop."

python3 -m http.server "$PORT" --bind 127.0.0.1
