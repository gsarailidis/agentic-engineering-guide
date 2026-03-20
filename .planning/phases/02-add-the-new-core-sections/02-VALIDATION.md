---
phase: 02
slug: add-the-new-core-sections
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-20
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | shell checks (`rg`, `sed`, protected-boundary verifier) |
| **Config file** | none |
| **Quick run command** | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$" AgenticAIGuide.md` |
| **Full suite command** | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$|Claude Code|Codex CLI|artifact|workflow|delegat|recover|failure" AgenticAIGuide.md` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$" AgenticAIGuide.md`
- **After every plan wave:** Run `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$|Claude Code|Codex CLI|artifact|workflow|delegat|recover|failure" AgenticAIGuide.md`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | STRU-01, STRU-02, STRU-03 | smoke | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$" AgenticAIGuide.md` | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | STRU-04, STRU-05 | smoke | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|skill|workflow|delegate|subagent|parallel" AgenticAIGuide.md` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 2 | STRU-06, STRU-07 | smoke | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$|verify|recovery|failure|retry|rollback|design" AgenticAIGuide.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| The rewritten body reads as a pattern-first guide rather than product documentation | STRU-01..STRU-07 | Structural coherence and tone cannot be fully judged by grep alone | Read from `# Agentic Frameworks` onward and confirm Claude Code is used as a concentrated example rather than the document spine. |
| Phase `02.1` is set up conceptually without explaining GSD itself | STRU-04, STRU-07 | This is a scope judgment, not a string match | Check that skills, workflows, artifacts, and execution control are defined clearly, but no GSD skill catalog or framework deep dive appears yet. |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
