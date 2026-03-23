# Roadmap: Agentic Guide

**Created:** 2026-03-19
**Project:** [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md)
**Requirements:** [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md)

## Overview

This roadmap is structured to preserve the approved early draft, define the guide's framing precisely, add the missing local-agent sections after `# IV. Agentic Frameworks`, add a focused GSD framework reference phase, and then tighten the result for clarity and scope discipline.

**Total phases:** 6  
**v1 requirements:** 23  
**Coverage:** 23/23 mapped

## Phases

| Phase | Name | Goal | Requirements |
|-------|------|------|--------------|
| 1 | Frame The Guide | Lock the guide's scope, examples, preservation rules, and editorial boundaries | SCOPE-01, SCOPE-02, SCOPE-03, SCOPE-04, PRES-01, PRES-02 |
| 2 | Add The New Core Sections | Write the agreed post-framework sections focused on local tool-using agent patterns | STRU-01, STRU-02, STRU-03, STRU-04, STRU-05, STRU-06, STRU-07 |
| 02.1 | Add GSD Framework Example And Skill Reference | Add GSD as a concrete workflow-framework example and include its categorized skill reference | GSD-01, GSD-02, GSD-03 |
| 03.1 | Document Architecture And Flow | Rework the guide's top-level flow, intro, and section sequencing so the argument is coherent before further expansion | FLOW-01, FLOW-02, FLOW-03, FLOW-04 |
| 03.2 | Problem Framing, Research, And Spec-Driven Engineering | Add the new top-level section on framing, research, workflow design, and specs before GSD | TBD during planning |
| 4 | Tighten And Verify | Make the guide clear, compact, newcomer-friendly, and within scope after the new structural phases land | OUTC-01, OUTC-02, OUTC-03, OUTC-04, EDIT-01, EDIT-02, EDIT-03 |

## Phase Details

### Phase 1: Frame The Guide

**Goal:** Establish exactly what this guide is about and what must not be changed.

**Plans:** 2/2 plans executed

Plans:
- [x] `01-01-PLAN.md` — Freeze the approved draft as a protected prefix and add an automated boundary verifier
- [x] `01-02-PLAN.md` — Append the environment-pivot framing and record the editorial contract for later phases

**Requirements:**
- SCOPE-01
- SCOPE-02
- SCOPE-03
- SCOPE-04
- PRES-01
- PRES-02

**Success criteria:**
1. The guide is explicitly positioned around local tool-using agents rather than agentic AI in general.
2. Claude Code and Codex CLI are used as examples without collapsing the guide into product documentation.
3. The existing draft before `# IV. Agentic Frameworks` is treated as protected unless the user explicitly approves edits.

### Phase 2: Add The New Core Sections

**Goal:** Add the missing conceptual body of the guide after the existing draft material.

**Plans:** 2/2 plans executed

Plans:
- [x] `02-01-PLAN.md` — Rewrite the post-framework body from environments through reusable workflows and delegation
- [x] `02-02-PLAN.md` — Finish the failure-handling and design sections, then tighten the full rewritten body

**Requirements:**
- STRU-01
- STRU-02
- STRU-03
- STRU-04
- STRU-05
- STRU-06
- STRU-07

**Success criteria:**
1. Each agreed section exists in the draft in a coherent order after `# IV. Agentic Frameworks`.
2. The new sections explain distinctive local-agent patterns rather than generic AI concepts.
3. Filesystem access, shell access, artifacts, skills, delegation, and verification are the organizing ideas.
4. The new material integrates cleanly with the existing draft without rewriting the protected earlier sections.

### Phase 02.1: Add GSD framework example and skill reference (INSERTED)

**Goal:** Add GSD as a concrete workflow-framework example and include the requested categorized skill reference without derailing the guide's broader scope.

**Requirements:**
- GSD-01
- GSD-02
- GSD-03

**Depends on:** Phase 2
**Plans:** 2/2 plans complete

Plans:
- [x] `02.1-01-PLAN.md` — Add the dedicated GSD section framing and short lifecycle walkthrough
- [x] `02.1-02-PLAN.md` — Add the full categorized skill reference and tighten the integrated section

**Success criteria:**
1. The guide explains what GSD is in relation to a local tool-using agent environment.
2. The guide includes the requested skill list grouped by function with short descriptions.
3. The GSD material reads as a concrete worked framework example rather than replacing the broader guide focus.

### Phase 03.1: Document Architecture And Flow (INSERTED)

**Goal:** Stabilize the document spine before further expansion by fixing flow, transitions, section roles, and introduction coherence.

**Requirements:**
- FLOW-01
- FLOW-02
- FLOW-03
- FLOW-04

**Depends on:** Phase 02.1
**Plans:** 1/2 plans executed

Plans:
- [x] `03.1-01-PLAN.md` — Lock the section-role contract and refactor the guide into the new top-level spine
- [ ] `03.1-02-PLAN.md` — Tighten the final handoffs and create the 03.1-local stabilized-boundary verifier

**Success criteria:**
1. The guide has a clear top-level argument from introduction through GSD.
2. The introduction cleanly distinguishes development-time use from production-system use without interweaving that distinction through unrelated sections.
3. The engineering-workflow perspective becomes equally central to the document's structure.
4. Sections I-III are assessed and reworked only where needed to support the new flow.

### Phase 03.2: Problem Framing, Research, And Spec-Driven Engineering (INSERTED)

**Goal:** Add a full top-level section before GSD covering framing, research, design, workflow design, and specs as core parts of agentic engineering.

**Requirements:**
- TBD during planning

**Depends on:** Phase 03.1
**Plans:** 0/0 plans complete

**Success criteria:**
1. The guide includes a dedicated top-level section before GSD for framing, research, workflow design, and spec-driven engineering.
2. The new section is general to terminal-native local-agent engineering rather than presented as a GSD-only concept.
3. The section creates a clean bridge into GSD as the final worked workflow-framework example.

### Phase 4: Tighten And Verify

**Goal:** Ensure the result is concise, technical, and useful to newcomers after the new architecture and framing work lands.

**Requirements:**
- OUTC-01
- OUTC-02
- OUTC-03
- OUTC-04
- EDIT-01
- EDIT-02
- EDIT-03

**Success criteria:**
1. A newcomer can distinguish plain chat from a terminal-native agent environment after reading.
2. The guide provides a usable design mental model rather than only definitions.
3. The document remains compact and does not drift into tutorial or framework-comparison territory.
4. The tone remains technical, direct, and free of hype.

## Notes

- Phase 1 is planning-complete based on current discussion.
- Phase 2 is the main writing phase.
- Phase 02.1 adds the GSD case-study/reference layer after the generic patterns are in place.
- Phase 03.1 stabilizes the document architecture before adding more conceptual surface area.
- Phase 03.2 adds the new framing/spec-driven layer before GSD.
- Phase 4 is the final editorial and verification pass, not a broad expansion phase.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Frame The Guide | 2/2 | Complete | 2026-03-19 |
| 2. Add The New Core Sections | 2/2 | Complete | 2026-03-20 |
| 02.1. Add GSD Framework Example And Skill Reference | 2/2 | Complete | 2026-03-20 |
| 03.1. Document Architecture And Flow | 1/2 | In Progress | 2026-03-23 |
| 03.2. Problem Framing, Research, And Spec-Driven Engineering | 0/0 | Not started | - |
| 4. Tighten And Verify | 0/0 | Not started | - |

---
*Last updated: 2026-03-23 after completing 03.1-01-PLAN.md*
