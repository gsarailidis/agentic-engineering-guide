---
phase: 01-frame-the-guide
plan: 02
subsystem: docs
tags: [markdown, editorial-framing, local-agents, claude-code, codex-cli]
requires:
  - phase: 01-frame-the-guide
    provides: protected prefix snapshot and verifier for AgenticAIGuide.md
provides:
  - environment-pivot framing appended to the guide without changing the frozen prefix
  - phase-local editorial contract for later writing phases
affects: [phase-2-writing, scope-control, editorial-consistency]
tech-stack:
  added: []
  patterns: [protected-prefix additive editing, pattern-first product examples]
key-files:
  created:
    - .planning/phases/01-frame-the-guide/01-framing-contract.md
    - .planning/phases/01-frame-the-guide/01-02-SUMMARY.md
  modified:
    - AgenticAIGuide.md
key-decisions:
  - "Kept the guide additive by appending the new framing at the actual file end so the protected prefix verifier remains valid."
  - "Locked Claude Code as the deeper concrete example while keeping Codex CLI as a confirming pattern example."
patterns-established:
  - "Protected content must be verified by script before and after every guide edit."
  - "Later phases should use the framing contract as the scope and exclusion source of truth."
requirements-completed: [SCOPE-01, SCOPE-02, SCOPE-03, SCOPE-04, PRES-02]
duration: 2 min
completed: 2026-03-19
---

# Phase 1 Plan 2: Frame The Guide Summary

**Environment-pivot framing for local tool-using agents plus a locked editorial contract for the rest of the guide**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-19T18:20:48Z
- **Completed:** 2026-03-19T18:22:48Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Added two bounded framing sections to [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) that narrow the guide to local execution environments and set expectations for the remaining scope.
- Created [01-framing-contract.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/01-framing-contract.md) as the exact phase-local writing contract for scope, examples, boundaries, targets, and exclusions.
- Verified the protected prefix still matches the frozen snapshot after the guide edit.

## Task Commits

Each task was committed atomically:

1. **Task 1: Append the environment-pivot framing to the guide** - `479b13b` (feat)
2. **Task 2: Record the locked framing contract for later phases** - `3aaa3a6` (docs)

## Files Created/Modified

- [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) - Adds the environment-pivot and scope-boundary handoff sections.
- [01-framing-contract.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/01-framing-contract.md) - Captures the exact framing rules Phase 2 must inherit.
- [01-02-SUMMARY.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/01-02-SUMMARY.md) - Records execution results, decisions, and verification.

## Decisions Made

- Appended the new framing at the actual document end because the guide already contained post-framework content and preserving the protected snapshot took precedence over inserting earlier.
- Repeated the same scope and example rules in both the guide and the contract so later phases inherit them without reinterpretation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Existing post-framework guide content shifted the protected snapshot**
- **Found during:** Task 1 (Append the environment-pivot framing to the guide)
- **Issue:** Inserting the new sections directly after `# Agentic Frameworks` changed line positions inside the frozen prefix window, causing `verify-protected-boundary.sh` to fail.
- **Fix:** Moved the same two required sections to the actual end of [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) so the edit stayed additive and the protected prefix remained unchanged.
- **Files modified:** AgenticAIGuide.md
- **Verification:** `bash .planning/phases/01-frame-the-guide/verify-protected-boundary.sh`
- **Committed in:** `479b13b`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The deviation preserved the protected-prefix guarantee and kept the plan within scope.

## Issues Encountered

- The repository currently has an unrelated modified [config.json](/home/nick/wd/agentic_guide/.planning/config.json); it was left untouched and excluded from all task commits.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 1 framing is now explicit in the guide and duplicated in a reusable contract for later writing.
- Phase 2 can build the core local-agent sections without reopening scope, product-role, or exclusion decisions.

## Self-Check: PASSED

- FOUND: `.planning/phases/01-frame-the-guide/01-framing-contract.md`
- FOUND: `.planning/phases/01-frame-the-guide/01-02-SUMMARY.md`
- FOUND: `479b13b`
- FOUND: `3aaa3a6`
