# Phase 1: Frame The Guide - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase defines how the guide is framed and bounded. It locks the scope, examples, transition strategy, and preservation constraints that will guide later writing. It does not add new content sections yet and does not change the protected material in `AgenticAIGuide.md` before `# Agentic Frameworks`.

</domain>

<decisions>
## Implementation Decisions

### Opening frame
- The guide should explicitly state early that it is about local tool-using agents, not agentic AI in general.
- The framing should make clear that the distinctive subject is the execution environment and the patterns it enables.

### Example strategy
- The guide should remain mostly generic rather than reading like product documentation.
- Claude Code and Codex CLI should be used as concrete examples.
- The guide should go deeper into Claude Code at least once so the reader sees one concrete realization of the patterns.

### Transition after `# Agentic Frameworks`
- Use an environment-pivot transition.
- The transition should explain that frameworks are not the main story here; the important shift happens when the model is embedded in an execution environment with filesystem access, shell access, tools, and persistent artifacts.
- This transition should naturally set up the later sections on operating patterns, artifacts, skills, delegation, and verification.

### Document size and density
- Do not optimize for extreme brevity.
- The guide should stay restrained in scope, but it does not need to be very short.
- Clarity and completeness within the agreed boundary matter more than aggressive compression.

### Claude's Discretion
- Exact wording of the opening framing paragraph
- Exact placement of the environment-pivot transition
- How much Codex CLI detail to include outside the deeper Claude Code example

</decisions>

<specifics>
## Specific Ideas

- The useful distinction is not "agentic AI" in the abstract, but what becomes possible when the model is embedded in a local operating environment.
- The concrete walkthrough should use Claude Code to show how patterns like filesystem access, CLI execution, artifacts, and reusable workflows show up in practice.

</specifics>

<canonical_refs>
## Canonical References

### Project planning
- `.planning/PROJECT.md` — project framing, core value, scope boundaries, and preservation rule
- `.planning/REQUIREMENTS.md` — phase requirements and editorial boundaries
- `.planning/ROADMAP.md` — fixed phase boundary for Phase 1

### Source draft
- `AgenticAIGuide.md` — existing guide draft; content before `# Agentic Frameworks` is protected unless the user explicitly approves edits

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AgenticAIGuide.md`: the only existing artifact; it provides the approved starting structure and tone for the guide

### Established Patterns
- No existing codebase patterns or planning context files yet
- The current draft is the main source of continuity and editorial constraint

### Integration Points
- New framing work must connect to the draft after `# Agentic Frameworks`
- Later phases should treat this context file as the authority for scope and transition decisions

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---
*Phase: 01-frame-the-guide*
*Context gathered: 2026-03-19*
