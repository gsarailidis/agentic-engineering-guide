---
phase: 02-add-the-new-core-sections
plan: 01
subsystem: docs
tags: [markdown, editorial, claude-code, codex-cli, workflow]
requires:
  - phase: 01-frame-the-guide
    provides: protected prefix verification, framing contract, and the framework-to-environment transition
provides:
  - pattern-first post-framework section spine from environments through delegation
  - explicit treatment of artifacts, reusable workflows, and scoped delegation
affects: [02-02-PLAN.md, 02.1 planning, guide structure]
tech-stack:
  added: []
  patterns: [pattern-first guide structure, artifact-backed execution framing]
key-files:
  created: [.planning/phases/02-add-the-new-core-sections/02-01-SUMMARY.md]
  modified: [AgenticAIGuide.md]
key-decisions:
  - "Replace the numbered Claude-Code-led draft after the Phase 1 transitions with five H2 sections centered on environment, loops, artifacts, workflows, and delegation."
  - "Keep Claude Code as a concentrated concrete example while using Codex CLI only as confirming evidence that the pattern generalizes."
patterns-established:
  - "Environment -> operating patterns -> control surfaces -> workflows -> delegation"
  - "Artifacts described as execution controls rather than incidental documentation"
requirements-completed: [STRU-01, STRU-02, STRU-03, STRU-04, STRU-05]
duration: 12 min
completed: 2026-03-20
---

# Phase 02 Plan 01: Add The New Core Sections Summary

**Pattern-first guide sections covering terminal-native environments, execution loops, control artifacts, reusable workflows, and delegated sub-work**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-20T09:58:00Z
- **Completed:** 2026-03-20T10:09:42Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Replaced the post-framework product-led draft with a pattern-first opening built around terminal-native environments, operating loops, and artifact control surfaces.
- Added reusable workflow and delegation sections that define skills and subagents in transferable terms instead of product documentation.
- Preserved every line before `# Agentic Frameworks` and kept the Phase 1 transition sections intact while preparing the conceptual handoff to Phase `02.1`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace the post-framework opening with the environment, operating-pattern, and artifact sections** - `118cc22` (feat)
2. **Task 2: Add the reusable-workflow and delegation sections with a Phase 02.1 handoff** - `9b1c156` (feat)

## Files Created/Modified
- `AgenticAIGuide.md` - Rewrote the guide body after the Phase 1 transitions with five new H2 sections.
- `.planning/phases/02-add-the-new-core-sections/02-01-SUMMARY.md` - Recorded execution details, decisions, and verification status for this plan.

## Decisions Made
- Replaced the old numbered Claude Code draft entirely instead of patching it in place so the guide now follows the environment-to-delegation spine required by Phase 2.
- Kept Claude Code visible as the deeper concrete example inside the new sections while using Codex CLI only to confirm that the operating pattern generalizes.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `rg` verification matched earlier occurrences of words like `skill` and `workflow` in the protected prefix, so final verification relied on heading checks plus direct review of the post-framework section.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The guide now has the first five required Phase 2 sections in a coherent order after `# Agentic Frameworks`.
- Phase `02.1` has the vocabulary it needs around artifacts, skills, workflows, and execution control without any premature GSD deep dive.

## Self-Check: PASSED

---
*Phase: 02-add-the-new-core-sections*
*Completed: 2026-03-20*
