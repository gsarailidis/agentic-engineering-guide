---
phase: 1
slug: frame-the-guide
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-19
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | shell-based verification for docs-only repo |
| **Config file** | none — existing shell commands cover this phase |
| **Quick run command** | `python3 .planning/phases/01-frame-the-guide/verify_protected_boundary.py` |
| **Full suite command** | `python3 .planning/phases/01-frame-the-guide/verify_protected_boundary.py && rg -n "local tool-using agents|tool-using local agents|Claude Code|Codex CLI" AgenticAIGuide.md && sed -n '1,/^# Agentic Frameworks$/p' AgenticAIGuide.md >/tmp/phase1-protected-prefix.txt && test -s /tmp/phase1-protected-prefix.txt` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `python3 .planning/phases/01-frame-the-guide/verify_protected_boundary.py`
- **After every plan wave:** Run `python3 .planning/phases/01-frame-the-guide/verify_protected_boundary.py && rg -n "local tool-using agents|tool-using local agents|Claude Code|Codex CLI" AgenticAIGuide.md`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | PRES-01 | script | `python3 .planning/phases/01-frame-the-guide/verify_protected_boundary.py` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | PRES-01 | grep | `test -f .planning/phases/01-frame-the-guide/protected-prefix.sha256 && test -f .planning/phases/01-frame-the-guide/protected-prefix.md` | ❌ W0 | ⬜ pending |
| 1-02-01 | 02 | 2 | SCOPE-01 | grep | `rg -n "local tool-using agents|tool-using local agents" AgenticAIGuide.md` | ✅ | ⬜ pending |
| 1-02-02 | 02 | 2 | SCOPE-02 | grep | `rg -n "Claude Code|Codex CLI" AgenticAIGuide.md .planning/phases/01-frame-the-guide/PHASE-1-FRAMING-CONTRACT.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/01-frame-the-guide/protected-prefix.md` — snapshot of protected draft through `# Agentic Frameworks`
- [ ] `.planning/phases/01-frame-the-guide/protected-prefix.sha256` — checksum for protected snapshot
- [ ] `.planning/phases/01-frame-the-guide/verify_protected_boundary.py` — boundary verifier script
- [ ] `.planning/phases/01-frame-the-guide/PHASE-1-FRAMING-CONTRACT.md` — explicit framing contract for Phase 1

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Example strategy stays mostly generic while using Claude Code and Codex CLI concretely | SCOPE-02 | Requires editorial judgment about emphasis, not just term presence | Read the new framing material after execution and confirm Claude Code is used for one deeper concrete explanation while Codex CLI remains a real but lighter example |
| Guide remains technical, direct, and easy for newcomers to follow | SCOPE-04 | Tone and clarity cannot be fully reduced to grep checks | Read the added Phase 1 framing paragraphs and confirm they avoid hype, avoid tutorial drift, and are understandable without prior product-specific context |
| New work is additive after the protected boundary rather than a rewrite | PRES-02 | Requires checking both placement and document continuity | Compare the protected prefix snapshot to the live file, then inspect the first added material after `# Agentic Frameworks` and confirm it behaves as a transition/handoff rather than a replacement |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-03-19
