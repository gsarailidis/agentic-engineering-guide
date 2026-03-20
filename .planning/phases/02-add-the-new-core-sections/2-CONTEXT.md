# Phase 2: Add The New Core Sections - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase rewrites and completes the guide body after `# Agentic Frameworks`. Its job is to produce the main conceptual treatment of terminal-native local agents: environments, operating patterns, artifacts, skills, delegation, failure handling, and design. It may heavily reshape or discard the current post-framework draft material if that produces a clearer guide. GSD is not implemented in this phase, but the phase should define skills, workflows, and artifacts in a way that cleanly sets up the later GSD example in Phase `02.1`.

</domain>

<decisions>
## Implementation Decisions

### Rewrite scope
- The current post-framework draft is not protected.
- Existing material after `# Agentic Frameworks` may be reused, reshaped, or discarded based on whether it helps the final structure.
- The goal is a coherent guide, not preservation of draft wording.

### Section structure
- The seven agreed Phase 2 sections remain the target content areas.
- Their final order may change if a different sequence reads more naturally from basics to design.
- The structure should be pattern-first rather than a product walkthrough.

### Claude Code treatment
- Claude Code should be the main concrete example for the guide.
- The deeper treatment should live mostly in one dedicated section or concentrated subsection.
- Brief Claude Code references may appear in other sections where they clarify a general pattern.

### GSD setup
- Phase 2 should explicitly define skills, workflows, and artifacts in terms that prepare the reader for the later GSD example.
- GSD itself should not be explained in detail in Phase 2.
- The GSD material belongs to Phase `02.1`, but the conceptual setup for it should already exist by the end of Phase 2.

### Claude's Discretion
- Exact section ordering
- Exact boundaries between the dedicated Claude Code treatment and the generic pattern sections
- Which existing draft passages are worth keeping, rewriting, or removing

</decisions>

<specifics>
## Specific Ideas

- The guide should move from the environment level to the operating-pattern level and then to design guidance.
- The dedicated Claude Code treatment should make the abstract patterns concrete without turning into product documentation.
- The later GSD phase should feel like a natural continuation of Phase 2 rather than a bolt-on appendix.

</specifics>

<canonical_refs>
## Canonical References

### Project planning
- `.planning/PROJECT.md` — scope, examples, editorial constraints, and the added GSD requirement
- `.planning/REQUIREMENTS.md` — Phase 2 structural requirements and downstream GSD requirements
- `.planning/ROADMAP.md` — fixed phase boundary for Phase 2 and inserted Phase `02.1`
- `.planning/STATE.md` — current project status and roadmap evolution

### Prior context
- `.planning/phases/01-frame-the-guide/1-CONTEXT.md` — locked framing decisions from Phase 1
- `.planning/phases/01-frame-the-guide/01-framing-contract.md` — editorial contract for post-framework writing

### Source draft
- `AgenticAIGuide.md` — current guide draft; content before `# Agentic Frameworks` remains protected

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AgenticAIGuide.md`: contains usable raw material for Claude Code, environment grounding, planning, tool use, and skills, but the current structure is draft-quality and incomplete.
- `AgenticAIGuide.md`: already contains the Phase 1 transition sections `## From Frameworks To Environments` and `## What The Rest Of This Guide Covers`, which should anchor the rewrite.

### Established Patterns
- The draft currently leans too heavily on Claude Code as the structure rather than using it as a concrete example inside a broader pattern-first guide.
- The post-framework area already includes rough material on tool use, planning, environment grounding, and skills that can be mined for content even if the headings are replaced.

### Integration Points
- New Phase 2 writing should replace or restructure the current content from `# Agentic Frameworks` onward.
- Phase 2 should leave clean conceptual handoffs for Phase `02.1`, especially around skills, workflows, artifacts, and explicit execution control.

</code_context>

<deferred>
## Deferred Ideas

- Detailed GSD description and full categorized skill reference — Phase `02.1`
- Any “when to use which skill” cheat sheet — Phase `02.1` or later, if still needed

</deferred>

---
*Phase: 02-add-the-new-core-sections*
*Context gathered: 2026-03-20*
