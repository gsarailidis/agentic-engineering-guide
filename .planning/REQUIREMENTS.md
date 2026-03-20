# Requirements: Agentic Guide

**Defined:** 2026-03-19
**Core Value:** Give newcomers a precise mental model of terminal-native local agents and the patterns they unlock, without hype, vagueness, or unnecessary breadth.

## v1 Requirements

### Scope And Positioning

- [x] **SCOPE-01**: Guide defines its subject as tool-using local agents rather than agentic AI in general.
- [x] **SCOPE-02**: Guide uses Claude Code and Codex CLI as concrete examples without reducing the guide to product-specific documentation.
- [x] **SCOPE-03**: Guide stays compact and does not expand into a large handbook.
- [x] **SCOPE-04**: Guide remains technical, direct, and easy for newcomers to follow.

### Draft Preservation

- [x] **PRES-01**: Existing content in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) before the `# Agentic Frameworks` heading remains unchanged unless the user explicitly approves edits.
- [x] **PRES-02**: New work integrates with the existing draft rather than replacing it.

### Guide Structure

- [x] **STRU-01**: Guide includes a section on terminal-native agent environments.
- [x] **STRU-02**: Guide includes a section on core operating patterns.
- [x] **STRU-03**: Guide includes a section on artifacts as control surfaces.
- [x] **STRU-04**: Guide includes a section on skills and reusable workflows.
- [x] **STRU-05**: Guide includes a section on delegation and parallel subagents.
- [x] **STRU-06**: Guide includes a section on verification, recovery, and failure modes.
- [x] **STRU-07**: Guide includes a section on how to design with these patterns.

### Concrete Framework Example

- [x] **GSD-01**: Guide describes GSD (Get Shit Done) as a concrete workflow framework built on top of a local tool-using agent environment.
- [x] **GSD-02**: Guide includes a categorized reference list of the GSD skills named by the user, with short descriptions.
- [x] **GSD-03**: Guide explains how GSD makes planning, execution, validation, workflow control, and maintenance explicit without turning the document into product documentation.

### Reader Outcome

- [ ] **OUTC-01**: Reader can explain what distinguishes a local tool-using agent environment from plain chat interaction.
- [ ] **OUTC-02**: Reader can identify the main execution patterns made possible by filesystem access, CLI access, structured tools, skills, and persistent artifacts.
- [ ] **OUTC-03**: Reader can reason about these systems as designed operating environments rather than as single prompts.
- [ ] **OUTC-04**: Reader finishes the guide ready to think clearly about working with or around these patterns, without needing a build tutorial.

### Editorial Boundaries

- [ ] **EDIT-01**: Guide does not turn into a step-by-step build tutorial.
- [ ] **EDIT-02**: Guide does not include framework shopping or model/provider comparisons.
- [ ] **EDIT-03**: Guide avoids broad agentic AI theory unless it directly supports understanding local tool-using agents.

## v2 Requirements

### Extensions

- **EXT-01**: Add a short appendix comparing Claude Code and Codex CLI in more detail.
- **EXT-02**: Add a practical companion document with implementation exercises.
- **EXT-03**: Add a glossary of recurring terms if later drafts become denser.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full implementation walkthrough | Would change the guide from orientation/design literacy into a tutorial |
| Framework comparison matrix | Expands scope without serving the main learning objective |
| Model/provider buying advice | Not necessary for understanding the operating patterns |
| Broad survey of all agent architectures | Dilutes the focus on local tool-using environments |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCOPE-01 | Phase 1 | Complete |
| SCOPE-02 | Phase 1 | Complete |
| SCOPE-03 | Phase 1 | Complete |
| SCOPE-04 | Phase 1 | Complete |
| PRES-01 | Phase 1 | Complete |
| PRES-02 | Phase 1 | Complete |
| STRU-01 | Phase 2 | Complete |
| STRU-02 | Phase 2 | Complete |
| STRU-03 | Phase 2 | Complete |
| STRU-04 | Phase 2 | Complete |
| STRU-05 | Phase 2 | Complete |
| STRU-06 | Phase 2 | Complete |
| STRU-07 | Phase 2 | Complete |
| GSD-01 | Phase 02.1 | Complete |
| GSD-02 | Phase 02.1 | Complete |
| GSD-03 | Phase 02.1 | Complete |
| OUTC-01 | Phase 3 | Pending |
| OUTC-02 | Phase 3 | Pending |
| OUTC-03 | Phase 3 | Pending |
| OUTC-04 | Phase 3 | Pending |
| EDIT-01 | Phase 3 | Pending |
| EDIT-02 | Phase 3 | Pending |
| EDIT-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0

---
*Requirements defined: 2026-03-19*
*Last updated: 2026-03-20 after completing 02.1-02-PLAN.md*
