#!/bin/bash
set -euo pipefail

echo '{"async": true, "asyncTimeout": 60000}'

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if command -v omniroute >/dev/null 2>&1; then
  if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:20128/v1/models; then
    setsid env OMNIROUTE_SERVER_HOST=127.0.0.1 REQUIRE_API_KEY=true omniroute \
      > /tmp/omniroute.log 2>&1 < /dev/null &
    disown -a
  fi
fi

if command -v headroom >/dev/null 2>&1; then
  if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:8787/health; then
    setsid headroom proxy --port 8787 \
      > /tmp/headroom.log 2>&1 < /dev/null &
    disown -a
  fi
fi

if [ -d /home/user/freellmapi-src ]; then
  if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:3001/api/ping; then
    (cd /home/user/freellmapi-src && setsid npm run dev \
      > /tmp/freellmapi.log 2>&1 < /dev/null &)
    disown -a
  fi
fi
