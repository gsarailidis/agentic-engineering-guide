---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 4
current_phase_name: Tighten And Verify
current_plan: 0
status: ready_to_plan
stopped_at: Verified 03.2-01-PLAN.md
last_updated: "2026-03-24T17:05:20.981Z"
last_activity: 2026-03-24
progress:
  total_phases: 6
  completed_phases: 5
  total_plans: 9
  completed_plans: 9
  percent: 100
---

# Project State

## Project Reference

See: [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md) (updated 2026-03-19)

**Core value:** Give newcomers a precise mental model of terminal-native local agents and the patterns they unlock, without hype, vagueness, or unnecessary breadth.
**Current focus:** Phase 4 — Tighten And Verify
**Active boundary guardrail:** `bash .planning/phases/03.1-document-architecture-and-flow/verify-stabilized-boundary.sh`

## Current Position

**Current Phase:** 4
**Current Phase Name:** Tighten And Verify
**Total Phases:** 6
**Current Plan:** 0
**Total Plans in Phase:** 0
**Status:** Ready to plan
**Last Activity:** 2026-03-24

**Progress:** [██████████] 100%

## Performance Metrics

| Phase | Duration | Tasks | Files |
|-------|----------|-------|-------|
| Phase 01 P01 | 3 min | 2 tasks | 3 files |
| Phase 01-frame-the-guide P02 | 2 min | 2 tasks | 5 files |
| Phase 02-add-the-new-core-sections P01 | 12 min | 2 tasks | 1 file |
| Phase 02-add-the-new-core-sections P02 | 4 min | 2 tasks | 1 files |
| Phase 02.1-add-gsd-framework-example-and-skill-reference P01 | 1 min | 2 tasks | 1 files |
| Phase 02.1-add-gsd-framework-example-and-skill-reference P02 | 1 min | 2 tasks | 1 files |
| Phase 03.1 P01 | 2h 15m | 3 tasks | 4 files |
| Phase 03.1 P02 | 17h 37m elapsed across user review pause | 3 tasks | 6 files |
| Phase 03.2 P01 | 4 min | 2 tasks | 4 files |

## Accumulated Context

### Decisions
- [Phase 01]: Store the protected-prefix checksum with a repo-relative path so root-level verification works.
- [Phase 01]: Use snapshot line count plus diff-based verification in a POSIX shell script before later guide edits.
- [Phase 01-frame-the-guide]: Corrected the protected boundary to end before `# IV. Agentic Frameworks`, allowing the framing handoff to live inside the frameworks portion of the guide.
- [Phase 01-frame-the-guide]: Locked Claude Code as the deeper concrete example while keeping Codex CLI as a confirming pattern example.
- [Roadmap]: Add Phase 02.1 for GSD so the guide can cover it as a concrete workflow-framework example and skill reference after the generic core sections.
- [Phase 02-add-the-new-core-sections]: Replace the numbered Claude-Code-led draft after the Phase 1 transitions with five H2 sections centered on environment, loops, artifacts, workflows, and delegation.
- [Phase 02-add-the-new-core-sections]: Keep Claude Code as a concentrated concrete example while using Codex CLI only as confirming evidence that the pattern generalizes.
- [Phase 02-add-the-new-core-sections]: Treat verification, retries, rollback, and bounded recovery as explicit parts of the local-agent operating environment rather than post-hoc cleanup.
- [Phase 02-add-the-new-core-sections]: Replace the leftover product-led framework opener with a pattern-first transition so the post-framework body reads as one argument from environment through design.
- [Phase 02.1-add-gsd-framework-example-and-skill-reference]: Frame GSD as a workflow layer above the local tool-using environment rather than as a new kind of agent system.
- [Phase 02.1-add-gsd-framework-example-and-skill-reference]: Explain the core GSD skills as one lifecycle narrative so planning, execution, validation, and continuity stay explicit without turning the guide into operator documentation.
- [Phase 02.1-add-gsd-framework-example-and-skill-reference]: Group the GSD skill reference by workflow function rather than alphabetically so the framework surfaces remain visible.
- [Phase 02.1-add-gsd-framework-example-and-skill-reference]: Keep the skill reference inside the same GSD section and tie it back to the lifecycle walkthrough so it reads as part of the guide body rather than an appendix.
- [Roadmap]: Renumber the old final Phase `3` to Phase `4` so two new inserted phases can land before the final verification pass.
- [Roadmap]: Use Phase `03.1` for document architecture and flow, then Phase `03.2` for the new top-level framing/research/spec-driven section before GSD.
- [Roadmap]: Keep the development-tool versus production-system distinction in the introduction rather than interweaving it through the new conceptual section.
- [Phase 03.1]: Keep the development-time versus production-system distinction in the introduction instead of repeating it later.
- [Phase 03.1]: Treat sections I-III as minimal prerequisites with tightened handoffs rather than rewriting them wholesale.
- [Phase 03.1]: Reserve Phase 03.2 as a top-level bridge section before GSD without drafting the substantive 03.2 body early.
- [Phase 03.1]: Protect the stabilized guide prefix through the line before `# VI. Spec-Driven Engineering` with `verify-stabilized-boundary.sh` as the active downstream guardrail.
- [Phase 03.1]: Accept the March 24 guide wording revisions, rename the reserved `# VI` bridge to `Spec-Driven Engineering`, and refresh the stabilized snapshot to treat that wording as canonical.
- [Phase 03.2]: Make specs the center of gravity in # VI and treat framing, research, and workflow design as upstream inputs to the execution contract.
- [Phase 03.2]: Treat the accepted # VI subsection headings and their TOC entries as canonical, then refresh the 03.1 boundary snapshot instead of forcing the guide back to the older reserved-bridge prefix.

### Roadmap Evolution
- Phase 02.1 inserted after Phase 2: Add GSD framework example and skill reference (URGENT)
- Phase 03.1 inserted after Phase 02.1: Document Architecture And Flow (URGENT)
- Phase 03.2 inserted after Phase 02.1: Spec-Driven Engineering (URGENT)
- Previous Phase 3 renumbered to Phase 4: Tighten And Verify

### Pending Todos
None yet.

### Blockers/Concerns
None yet.

## Session Continuity

**Last session:** 2026-03-24T17:05:20.981Z
**Stopped At:** Verified 03.2-01-PLAN.md
**Resume File:** None
