# Phase 3: Tighten And Verify - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase is the final editorial and verification pass for the guide. It should tighten the current document for clarity, newcomer readability, proportion, and scope discipline without expanding the guide or reopening earlier structural decisions. Content before `# Agentic Frameworks` remains protected unless the user explicitly approves changes there.

</domain>

<decisions>
## Implementation Decisions

### Tightening strategy
- Use a balanced trim.
- Remove repetition and awkward transitions, but keep enough reinforcement for newcomers to follow the guide's argument.
- Do not optimize for maximum compression at the cost of readability.

### Reader posture
- Keep the current balance: technical and direct, but still accessible to a newcomer.
- Preserve the guide's plain, unsentimental tone.
- Add signposting only where it materially improves flow or contrast.

### GSD proportion
- Keep the GSD section at roughly its current proportion if it reads cleanly in context.
- GSD should remain a concrete framework example inside the broader guide, not take over the document.
- Trim GSD only where it is redundant or disrupts the guide's flow.

### Verification standard
- Treat this as an editorial pass plus explicit reader-outcome checks.
- Verify not only wording and transitions, but also whether each major section supports the reader outcomes in `OUTC-01..04`.
- Check section boundaries and transitions so the guide still reads as one argument rather than a stack of disconnected notes.

### Locked decisions from prior phases
- Do not modify content before `# Agentic Frameworks` without explicit approval.
- Keep the guide pattern-first rather than product-led.
- Keep Claude Code as the deeper concrete example and Codex CLI as a confirming example.
- Keep GSD as one dedicated workflow-framework section inside the guide body, not an appendix or cheat sheet.

### Claude's Discretion
- Exact cuts, rewrites, and transition edits in the post-framework body
- Whether any section needs light restructuring to improve flow without changing scope
- How to perform explicit reader-outcome checks during planning and execution

</decisions>

<specifics>
## Specific Ideas

- The final pass should feel like tightening a stable mental model, not reopening the guide's architecture.
- Reader-outcome checks should stay concrete: can a newcomer distinguish plain chat from a local agent environment, identify the main operating patterns, and understand the guide as an operating-environment argument rather than a prompt trick.
- The GSD section can stay substantial as long as it still reads as the worked framework example that cashes out the broader pattern language.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning
- `.planning/PROJECT.md` — guide framing, hard scope boundaries, and example strategy
- `.planning/REQUIREMENTS.md` — `OUTC-01..04` and `EDIT-01..03` define this phase's acceptance criteria
- `.planning/ROADMAP.md` — fixed scope and success criteria for Phase `3`
- `.planning/STATE.md` — current project position and carried-forward decisions

### Prior phase context
- `.planning/phases/01-frame-the-guide/1-CONTEXT.md` — framing, example strategy, and preservation rules
- `.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md` — pattern-first structure and Claude Code treatment
- `.planning/phases/02.1-add-gsd-framework-example-and-skill-reference/02.1-CONTEXT.md` — GSD framing, proportion rules, and exclusions

### Source guide
- `AgenticAIGuide.md` — current draft to tighten and verify; content before `# Agentic Frameworks` remains protected
- `.planning/phases/01-frame-the-guide/01-framing-contract.md` — editorial contract for the protected boundary and post-framework writing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AgenticAIGuide.md`: already contains the full intended structure and all major sections; Phase 3 is about tightening and verification, not content expansion.
- `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh`: existing guardrail for ensuring the protected prefix remains unchanged.

### Established Patterns
- The guide now follows a pattern-first structure from environment through workflows, delegation, verification, design, and the GSD framework example.
- Prior phases already established that comparison language should be brief and only used when it clarifies layer boundaries.

### Integration Points
- Phase 3 work should focus on the post-framework body while respecting the protected boundary.
- Planning should include explicit checks for newcomer readability, redundancy, transition quality, scope discipline, and reader-outcome coverage.

</code_context>

<deferred>
## Deferred Ideas

- Any appendix or expanded comparison between Claude Code and Codex CLI — v2 scope
- Any practical implementation companion or exercise material — v2 scope
- Any glossary expansion unless the document later becomes denser — v2 scope

</deferred>

---
*Phase: 03-tighten-and-verify*
*Context gathered: 2026-03-20*
