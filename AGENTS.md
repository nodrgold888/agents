# Installed agent tooling

This repo has four external agent/dev tools installed, plus the
`@apollo/space-kit` design system. Notes below cover what each is, how
it's configured, and how to bring it back up in a fresh environment
(none of this is state that persists automatically outside a running
container — see "Persistence" at the bottom).

## claude-mem — persistent memory for Claude Code

- Installed as a Claude Code plugin (`thedotmack/claude-mem`), local
  provider (runs on your own Anthropic plan, no cloud sync).
- Start the worker: `npx claude-mem start`
- Check status: `npx claude-mem status`
- Dashboard: http://127.0.0.1:37700
- Data lives in `~/.claude-mem` on the machine it runs on.

## claude-code-setup — official Anthropic setup plugin

- Installed from the real official marketplace:
  `claude plugin marketplace add anthropics/claude-plugins-official`
  `claude plugin install claude-code-setup@claude-plugins-official`

## headroom — compression/optimization proxy

- Python package: `pip install "headroom-ai[all]"`
- Run the proxy: `headroom proxy --port 8787`
  (binds loopback-only by default — no inbound token needed)
- Health check: `curl http://127.0.0.1:8787/health`
- To route Claude Code through it:
  `ANTHROPIC_BASE_URL=http://127.0.0.1:8787 claude`
  (this is set as the default in `~/.bashrc` in this environment)

## omniroute — multi-provider AI gateway

- Installed globally: `npm install -g omniroute`
- Run it bound to loopback with auth required (recommended — the
  default is `0.0.0.0` with **no** API-key requirement, which
  OmniRoute's own startup banner flags as unsafe on a shared host):
  `OMNIROUTE_SERVER_HOST=127.0.0.1 REQUIRE_API_KEY=true omniroute`
- Dashboard / API base: http://127.0.0.1:20128 (`/v1` for the OpenAI-
  compatible endpoint)
- **Not yet wired to route real traffic.** It has no upstream provider
  credentials or OmniRoute API key configured — that requires real
  secrets (an OmniRoute account/API key, or per-provider keys) that
  only the repo owner can supply. Once you have one:
  `omniroute setup-claude --api-key <key>` generates Claude Code
  profiles from the live model catalog.

## @apollo/space-kit

- Deprecated/archived Apollo design system (React components, design
  tokens, `reset.css`). Installed as a regular npm dependency:
  `npm install @apollo/space-kit @emotion/core @emotion/cache framer-motion`
- Verified importable: `require('@apollo/space-kit/colors')`

## Persistence

Everything above except the npm dependency (`package.json`) is
runtime/session state — plugin installs, running proxy processes, and
`~/.bashrc` env vars all live in the container's filesystem and process
table, not in this git repo. A fresh container (or a fresh clone of
this repo) starts with none of it running. This file exists so anyone
(human or agent) picking this repo up again can reconstruct the setup
with the commands above rather than needing tribal knowledge.
