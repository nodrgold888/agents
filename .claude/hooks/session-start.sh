#!/bin/bash
set -euo pipefail

echo '{"async": true, "asyncTimeout": 60000}'

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

command -v omniroute >/dev/null 2>&1 || exit 0
command -v headroom >/dev/null 2>&1 || exit 0

if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:20128/v1/models; then
  setsid env OMNIROUTE_SERVER_HOST=127.0.0.1 REQUIRE_API_KEY=true omniroute \
    > /tmp/omniroute.log 2>&1 < /dev/null &
  disown -a
fi

if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:8787/health; then
  setsid headroom proxy --port 8787 \
    > /tmp/headroom.log 2>&1 < /dev/null &
  disown -a
fi
