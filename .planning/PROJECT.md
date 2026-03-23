# Agentic Guide

## What This Is

This project is a compact technical guide for newcomers who want a clear and grounded understanding of tool-using local agents. It focuses on the class of terminal-native agent systems that can inspect a local filesystem, execute CLI commands, persist artifacts, and reuse higher-level workflows, with Claude Code and Codex CLI used as the main concrete examples. It also includes GSD (Get Shit Done) as a concrete workflow framework layered on top of this kind of environment.

The guide is not a build tutorial, framework comparison, or market survey. Its purpose is to help a technically literate reader understand the operating patterns these environments make possible, reason about their design, and become ready to work effectively with them.

## Core Value

Give newcomers a precise mental model of terminal-native local agents and the patterns they unlock, without hype, vagueness, or unnecessary breadth.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Preserve the stabilized guide prefix in [AgenticEngineeringGuide.md](/home/nick/wd/agentic_guide/AgenticEngineeringGuide.md) from line 1 through the line immediately before `# VI. Problem Framing, Research, And Spec-Driven Engineering`, verified with [verify-stabilized-boundary.sh](/home/nick/wd/agentic_guide/.planning/phases/03.1-document-architecture-and-flow/verify-stabilized-boundary.sh), unless a later phase explicitly redefines that boundary.
- [ ] Define the guide around the broader category of tool-using local agents, with Claude Code and Codex CLI as the main examples because they expose the relevant patterns clearly.
- [ ] Include GSD (Get Shit Done) as a concrete workflow-framework example that shows how skills, artifacts, planning, execution, and verification can be organized on top of a local agent environment.
- [ ] Keep the guide compact, technical, direct, and easy for newcomers to follow from basics to practical design understanding.
- [ ] Cover the specific post-framework sections already agreed: terminal-native agent environments, core operating patterns, artifacts as control surfaces, skills and reusable workflows, delegation and parallel subagents, verification/recovery/failure modes, and how to design with these patterns.
- [ ] Exclude build tutorials, framework shopping, provider/model comparisons, and broad agentic AI theory that does not directly support understanding local tool-using agents.

### Out of Scope

- Step-by-step agent implementation tutorial — the goal is orientation and design literacy, not teaching the reader to build a first agent in this guide.
- Framework or model selection guide — this would expand scope and pull the document away from the patterns that matter.
- General survey of all agentic AI architectures — the focus is the execution environment and operating patterns of local tool-using agents.

## Context

The starting point is an existing draft file, [AgenticEngineeringGuide.md](/home/nick/wd/agentic_guide/AgenticEngineeringGuide.md). Phase `03.1` stabilized the guide spine through the line immediately before `# VI. Problem Framing, Research, And Spec-Driven Engineering`, and downstream work should treat [verify-stabilized-boundary.sh](/home/nick/wd/agentic_guide/.planning/phases/03.1-document-architecture-and-flow/verify-stabilized-boundary.sh) as the active guardrail for that prefix. The older Phase `1` freeze remains historical context only.

The missing work is not a rewrite of the whole document. It is a reframing of the guide after the existing sections so the rest of the document teaches the distinctive patterns exposed by environments such as Claude Code and Codex CLI: filesystem access, shell execution, structured tools, skills, persistent artifacts, delegated work, and verification/recovery loops. It also needs one focused treatment of GSD as a concrete framework that packages these patterns into a repeatable workflow system.

The audience is a newcomer who needs a clear mental model and a well-rounded picture, but not a full implementation path. The tone must stay technical, plain, and concise.

## Constraints

- **Scope**: Keep the guide small — it should orient and sharpen understanding without turning into a handbook.
- **Editorial**: Preserve the stabilized prefix through the line immediately before `# VI. Problem Framing, Research, And Spec-Driven Engineering` unless a later approved phase explicitly redefines it, and verify that boundary with `bash .planning/phases/03.1-document-architecture-and-flow/verify-stabilized-boundary.sh`.
- **Audience**: Write for newcomers, but assume they can handle technical reasoning if it is clearly explained.
- **Style**: Technical, direct, and unsentimental — avoid hype, fluff, and vague claims.
- **Examples**: Use Claude Code and Codex CLI as concrete examples without collapsing the guide into product-specific documentation.
- **Concrete Framework**: Include GSD as a concrete workflow-framework example and skill reference, but keep it subordinate to the broader design patterns the guide is teaching.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Focus on local tool-using agents rather than agentic AI in general | The user's actual interest is in the novel patterns enabled by local execution environments | — Pending |
| Use Claude Code and Codex CLI as the main examples | They are representative and have developed the relevant patterns clearly | — Pending |
| Add GSD as a concrete workflow-framework example | It provides a clear example of how skills, artifacts, and phase-based execution can be organized around a local agent | — Pending |
| Preserve the stabilized prefix through the line immediately before `# VI. Problem Framing, Research, And Spec-Driven Engineering` with the Phase `03.1` verifier | Phase `03.1` deliberately stabilized the introduction-through-Claude-Code spine so later phases can add `03.2` content without reopening that architecture | Active guardrail: `verify-stabilized-boundary.sh` |
| Keep the guide compact and non-tutorial | The goal is conceptual readiness and design understanding, not implementation onboarding | — Pending |

---
*Last updated: 2026-03-19 after initialization*
