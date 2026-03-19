# Phase 1: Frame The Guide - Research

**Researched:** 2026-03-19
**Domain:** Editorial framing for a technical guide about terminal-native local agents
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SCOPE-01 | Guide defines its subject as tool-using local agents rather than agentic AI in general. | Use an explicit opening scope statement and an environment-pivot transition that narrows the subject from generic agency to local execution environments. |
| SCOPE-02 | Guide uses Claude Code and Codex CLI as concrete examples without reducing the guide to product-specific documentation. | Use a pattern-first, examples-second structure with Claude Code and Codex CLI named as representative implementations. |
| SCOPE-03 | Guide stays compact and does not expand into a large handbook. | Treat Phase 1 as boundary-setting only; do not add tutorial, comparison, or appendix content here. |
| SCOPE-04 | Guide remains technical, direct, and easy for newcomers to follow. | Keep the framing precise, avoid theory detours, and organize later sections around execution patterns rather than product features. |
| PRES-01 | Existing content in AgenticAIGuide.md through the `# Agentic Frameworks` section remains unchanged unless the user explicitly approves edits. | Preserve the current draft as a protected block and plan verification around boundary checks before any edits. |
| PRES-02 | New work integrates with the existing draft rather than replacing it. | Add an environment-pivot transition after `# Agentic Frameworks` and build later sections from that handoff instead of rewriting the draft. |
</phase_requirements>

## Summary

Phase 1 is not a feature-writing phase. It is a framing and boundary-setting phase for a docs-only project. The planner should treat the existing draft in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) through `# Agentic Frameworks` as protected source material, then define exactly how the rest of the guide should pivot from generic agentic concepts to terminal-native local agent environments.

The core implementation choice is to use an environment-pivot transition as the hinge. That lets the guide acknowledge generic agentic concepts already present in the draft, then explicitly narrow to the real subject: agents embedded in local execution environments with filesystem access, shell access, tools, and persistent artifacts. Claude Code and Codex CLI should be used as examples of that pattern, but the guide must stay pattern-oriented rather than feature-oriented.

This means the plan should optimize for three outputs: a locked framing statement, a locked example strategy, and a locked preservation strategy. If Phase 1 starts writing large new sections, comparing tools, or revising the protected material, it has already drifted out of scope.

**Primary recommendation:** Plan Phase 1 as a constraint-setting docs edit centered on one environment-pivot handoff after `# Agentic Frameworks`, with explicit checks that the protected draft remains untouched.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Markdown documents (`.md`) | N/A | Primary authoring format for the guide and planning artifacts | The repo is docs-only and already organized around markdown sources and GSD planning files. |
| GSD planning artifacts (`PROJECT.md`, `REQUIREMENTS.md`, `STATE.md`, `CONTEXT.md`) | 2026-03-19 project set | Source of scope, requirement, and preservation truth | These files are the controlling inputs for planning and must drive edits instead of ad hoc rewriting. |
| Existing draft in `AgenticAIGuide.md` | Current workspace draft | Canonical content to preserve and extend | The early draft is explicitly protected and is the continuity anchor for later writing. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `rg` | Workspace tool | Fast textual verification of headings, key phrases, and preservation boundaries | Use during implementation and verification to confirm required framing language exists. |
| Official product docs for Claude Code and Codex CLI | Current as checked on 2026-03-19 | Verify high-level capability claims used as examples | Use only to validate broad facts like terminal use, local code access, and command execution. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pattern-first framing | Product-first walkthrough | Easier to make concrete, but it violates SCOPE-02 by collapsing the guide into documentation. |
| Protected draft + additive transition | Rewrite the opening sections | Might read more uniformly, but it violates PRES-01 unless the user explicitly approves edits. |
| Compact boundary-setting phase | Large outline plus drafted future sections | Feels productive, but it creates scope drift and weakens later phase separation. |

**Installation:**
```bash
# No new packages required for Phase 1 research/planning.
```

## Architecture Patterns

### Recommended Project Structure
```text
AgenticAIGuide.md                          # Source guide; preserve content through "# Agentic Frameworks"
.planning/
├── PROJECT.md                             # Project framing and scope
├── REQUIREMENTS.md                        # Requirement truth
├── STATE.md                               # Current project status
└── phases/01-frame-the-guide/
    ├── 1-CONTEXT.md                       # Locked user decisions for this phase
    └── 01-RESEARCH.md                     # Planner-facing implementation guidance
```

### Pattern 1: Protected Header, Additive Handoff
**What:** Treat everything through `# Agentic Frameworks` as a fixed preface, then add a transition that narrows the guide to local tool-using agents.
**When to use:** Always for Phase 1; this is the core preservation strategy.
**Example:**
```markdown
## Transition: From Frameworks To Environments

Framework lists are not the main point of this guide.
What matters is what changes when a model is embedded in a local operating environment:
it can inspect files, run shell commands, persist artifacts, and reuse workflows across steps.

That environment is the real subject of the rest of this guide.
Claude Code and Codex CLI are useful examples, but the guide is about the broader pattern.
```
Source: local project constraints from [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md) and [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md)

### Pattern 2: Pattern-First, Example-Second
**What:** State the general operating pattern first, then attach Claude Code and Codex CLI as concrete examples.
**When to use:** For every mention of products in this guide.
**Example:**
```markdown
Local tool-using agents are best understood as operating environments, not just chat interfaces.
Claude Code and Codex CLI make this concrete because they can inspect a working directory,
run commands, and leave durable artifacts behind.
```
Source: [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md), Anthropic Claude Code overview, and OpenAI Codex CLI overview

### Pattern 3: One Deep Example, Not Two Parallel Product Guides
**What:** Use Claude Code for one slightly deeper concrete walkthrough, while keeping Codex CLI present as a confirming example rather than mirroring every detail.
**When to use:** When later sections need one grounded illustration of an abstract pattern.
**Example:**
```markdown
For one concrete picture, consider Claude Code operating inside a repo:
it can inspect the tree, run commands, edit files, and carry forward artifacts such as plans or checklists.
Codex CLI fits the same pattern, so the lesson generalizes beyond one product.
```
Source: [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md)

### Anti-Patterns to Avoid
- **Product-doc sprawl:** Do not organize the phase around commands, flags, installation steps, or feature matrices.
- **Generic agentic theory relapse:** Do not keep expanding the abstract definition space once the guide pivots to environments.
- **Silent protected edits:** Do not alter the opening draft casually; preserve it unless the user explicitly approves otherwise.
- **Two equal walkthroughs:** Do not build mirrored Claude Code and Codex CLI mini-guides; one deeper example is enough.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scope control | A new ad hoc framing from scratch | The locked framing decisions in `1-CONTEXT.md` | The user already resolved the main gray areas. Reopening them wastes planning effort and risks drift. |
| Preservation checks | Memory-based "I think I didn't change it" review | Explicit protected-boundary verification against `# Agentic Frameworks` | Protected content is a hard requirement and should be checked, not assumed. |
| Product explanation | Feature-by-feature tool documentation | Pattern-first descriptions backed by one or two broad product examples | Product detail expands quickly and undercuts the guide's generality. |
| Guide expansion | New sections beyond the phase boundary | The fixed Phase 1 remit from `ROADMAP.md` | This phase exists to lock boundaries for later writing, not to consume their work early. |

**Key insight:** The planner should reuse the decisions already made in project artifacts and spend effort on enforcing boundaries, not inventing more content surface area.

## Common Pitfalls

### Pitfall 1: Treating The Phase Like A Rewrite
**What goes wrong:** The plan starts revising the early draft or proposing a new document structure from the top.
**Why it happens:** The existing draft begins broadly, so it is tempting to "fix" that broadness by rewriting it.
**How to avoid:** Treat `# Agentic Frameworks` as the pivot boundary, not as permission to rework earlier sections.
**Warning signs:** Tasks mention rewriting sections I-III or replacing the opening definitions.

### Pitfall 2: Slipping Into Product Documentation
**What goes wrong:** Claude Code and Codex CLI become the subject instead of examples.
**Why it happens:** Concrete products make abstract patterns easier to explain, so examples can take over.
**How to avoid:** Require every product mention to answer a pattern question first.
**Warning signs:** Tasks focus on setup, commands, pricing, or tool-specific configuration.

### Pitfall 3: Losing The Environment Pivot
**What goes wrong:** The guide remains a generic discussion of agents, tools, memory, and frameworks without clearly narrowing to local operating environments.
**Why it happens:** The existing draft already covers generic agentic concepts, and the transition is easy to postpone.
**How to avoid:** Make the environment-pivot transition an explicit deliverable of Phase 1.
**Warning signs:** No sentence states that the execution environment is the distinctive subject of the rest of the guide.

### Pitfall 4: Over-Compressing The Guide
**What goes wrong:** The planner cuts too aggressively in the name of compactness and loses newcomer clarity.
**Why it happens:** SCOPE-03 can be misread as "make it very short."
**How to avoid:** Keep the guide bounded, but let it spend words where the mental model needs them.
**Warning signs:** Plans optimize for length first instead of explanatory clarity.

## Code Examples

Verified patterns from official and project sources:

### Scope Statement Pattern
```markdown
This guide is about local tool-using agents: systems that do useful work because they operate inside
an execution environment with access to files, commands, tools, and durable artifacts.
It is not a general survey of agentic AI.
```
Source: synthesized from [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md), [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md), and [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md)

### Example Usage Pattern
```markdown
Claude Code and Codex CLI are useful examples because they expose the same class of environment-level behavior:
the model can inspect the working tree, execute commands, modify files, and carry forward artifacts between steps.
The guide uses them to clarify the pattern, not to document every feature they expose.
```
Source: Anthropic Claude Code overview and OpenAI Codex CLI overview, cross-checked against project constraints

### Preservation Rule Pattern
```markdown
Protected boundary: preserve all existing content through `# Agentic Frameworks`.
New framing work starts after that point unless the user explicitly approves upstream edits.
```
Source: [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md), [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md), [STATE.md](/home/nick/wd/agentic_guide/.planning/STATE.md)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| "Agentic AI" as a broad conceptual category | Terminal-native local agents as the specific subject of this guide | Locked by project artifacts on 2026-03-19 | Narrows the guide to the environment patterns that matter for this project. |
| Product-specific walkthroughs as the main teaching device | Pattern-first explanation with products as examples | Locked by phase context on 2026-03-19 | Keeps the guide useful beyond one vendor and prevents doc sprawl. |
| Rewriting early draft sections for consistency | Preserving the approved early draft and extending from its boundary | Locked by requirement PRES-01 on 2026-03-19 | Protects user-approved material and simplifies planning. |

**Deprecated/outdated:**
- Broad framework shopping for this phase: out of scope for this project and explicitly disallowed by `EDIT-02`.
- Early-draft rewrites without approval: blocked by `PRES-01`.

## Open Questions

1. **Where exactly should the environment-pivot transition live after `# Agentic Frameworks`?**
   - What we know: It must occur after that section and before the later operating-pattern sections.
   - What's unclear: Whether it should be a short bridge paragraph or its own named section.
   - Recommendation: Let the planner keep both as acceptable options, but require the transition to be explicit and early.

2. **How much Codex CLI detail is enough outside the deeper Claude Code example?**
   - What we know: Codex CLI must be a real example, not a token mention.
   - What's unclear: How many concrete references are needed before it feels balanced.
   - Recommendation: Plan for repeated but brief Codex CLI mentions that reinforce the pattern, not a second deep dive.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently configured - docs-only repo using shell checks |
| Config file | none - see Wave 0 |
| Quick run command | `rg -n "local tool-using agents|tool-using local agents|Claude Code|Codex CLI" AgenticAIGuide.md .planning/phases/01-frame-the-guide/1-CONTEXT.md` |
| Full suite command | `rg -n "^# Agentic Frameworks|Claude Code|Codex CLI|local tool-using agents|tool-using local agents" AgenticAIGuide.md .planning/phases/01-frame-the-guide/1-CONTEXT.md .planning/REQUIREMENTS.md .planning/PROJECT.md` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SCOPE-01 | Guide framing explicitly narrows to local tool-using agents | smoke | `rg -n "local tool-using agents|tool-using local agents" AgenticAIGuide.md` | ✅ |
| SCOPE-02 | Claude Code and Codex CLI appear as examples, not sole subject | manual-only | `rg -n "Claude Code|Codex CLI" AgenticAIGuide.md` | ✅ |
| SCOPE-03 | Guide stays bounded and avoids handbook growth | manual-only | `wc -l AgenticAIGuide.md` | ✅ |
| SCOPE-04 | Tone remains technical and newcomer-friendly | manual-only | `sed -n '1,220p' AgenticAIGuide.md` | ✅ |
| PRES-01 | Protected content through `# Agentic Frameworks` remains unchanged without approval | manual-only | `sed -n '1,/^# Agentic Frameworks$/p' AgenticAIGuide.md` | ✅ |
| PRES-02 | New work is additive after the protected boundary | manual-only | `rg -n "^# Agentic Frameworks" AgenticAIGuide.md` | ✅ |

### Sampling Rate
- **Per task commit:** `rg -n "local tool-using agents|tool-using local agents|Claude Code|Codex CLI" AgenticAIGuide.md`
- **Per wave merge:** `sed -n '1,/^# Agentic Frameworks$/p' AgenticAIGuide.md`
- **Phase gate:** Manual review that protected content is unchanged and the environment-pivot framing is explicit

### Wave 0 Gaps
- [ ] No automated docs verification script yet for protected-boundary checks
- [ ] No baseline snapshot or checksum for the protected portion of `AgenticAIGuide.md`
- [ ] No lint/test harness for markdown guidance; verification is currently shell plus manual review

## Sources

### Primary (HIGH confidence)
- [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md) - locked phase decisions and transition strategy
- [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md) - requirement definitions and editorial boundaries
- [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md) - project framing, examples, and preservation rule
- [STATE.md](/home/nick/wd/agentic_guide/.planning/STATE.md) - current phase focus and important constraints
- [ROADMAP.md](/home/nick/wd/agentic_guide/.planning/ROADMAP.md) - fixed phase goal and success criteria

### Secondary (MEDIUM confidence)
- https://code.claude.com/docs/en/overview - verified that Claude Code is positioned as a coding agent that reads code, edits files, and runs commands
- https://developers.openai.com/codex/cli - verified that Codex CLI runs locally in the terminal and can inspect, edit, and run code

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - driven mostly by local project artifacts rather than unstable ecosystem choices
- Architecture: HIGH - the core pattern is explicitly locked in `1-CONTEXT.md`
- Pitfalls: HIGH - risks are directly implied by requirements and the preserved draft boundary

**Research date:** 2026-03-19
**Valid until:** 2026-04-18
