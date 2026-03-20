# Phase 2: Add The New Core Sections - Research

**Researched:** 2026-03-20
**Domain:** Editorial architecture for the main conceptual body of a technical guide about terminal-native local agents
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
- Detailed GSD description and full categorized skill reference — Phase `02.1`
- Any “when to use which skill” cheat sheet — Phase `02.1` or later, if still needed
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| STRU-01 | Guide includes a section on terminal-native agent environments. | Start the new body with the environment as the unit of analysis: local filesystem, shell, tools, permissions, and durable working state. |
| STRU-02 | Guide includes a section on core operating patterns. | Follow the environment section with the recurring loop patterns the environment enables: inspect, plan, act, check, iterate. |
| STRU-03 | Guide includes a section on artifacts as control surfaces. | Treat plans, task files, summaries, checklists, and state files as first-class system controls rather than incidental outputs. |
| STRU-04 | Guide includes a section on skills and reusable workflows. | Define skills as packaged operating patterns layered on top of the base environment, explicitly setting up Phase `02.1`. |
| STRU-05 | Guide includes a section on delegation and parallel subagents. | Explain decomposition, scoped sub-work, and orchestration as environment-level capabilities rather than magic autonomy. |
| STRU-06 | Guide includes a section on verification, recovery, and failure modes. | Make checking, rollback, retries, and bounded recovery explicit so the guide reads like systems design rather than hype. |
| STRU-07 | Guide includes a section on how to design with these patterns. | End with synthesis: how to compose environments, artifacts, skills, delegation, and verification into usable operating systems. |
</phase_requirements>

## Summary

Phase 2 is the main rewrite of the guide body after `# Agentic Frameworks`. The existing draft already contains raw material on planning, tool use, environment grounding, skills, and iteration, but its current structure is anchored too tightly to Claude Code. The planner should treat that material as a parts bin, not as a structure to preserve. The target outcome is a seven-section conceptual spine that teaches the operating environment first, then the patterns that emerge inside it, then the design guidance that follows.

The core planning move is to replace the current post-framework heading sequence with a pattern-first sequence. Claude Code remains the main concrete example, but it should appear as concentrated illustration inside the broader sections rather than determining the whole outline. Codex CLI should continue to appear as a confirming example so the guide generalizes beyond one product. Phase `02.1` depends on this phase defining artifacts, skills, and workflows cleanly, so those concepts need crisp treatment here without drifting into GSD specifics.

The main risk is structural drift: either keeping too much of the current Claude-Code-centric draft, or expanding into tutorial and product-documentation territory. Plan this phase as a controlled replacement of the post-framework body with explicit preservation of everything before `# Agentic Frameworks`, plus shell-based verification that the new section spine exists and the protected boundary remains intact.

**Primary recommendation:** Replace the current post-framework draft with a seven-section pattern-first outline ordered from environment to operating patterns to design, using Claude Code as one concentrated concrete example rather than the document spine.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Markdown documents (`.md`) | N/A | Author the guide and planning artifacts | The repo is docs-only and all implementation work for this phase is guide writing plus planning metadata. |
| `AgenticAIGuide.md` | Current workspace draft | Canonical guide source to revise after `# Agentic Frameworks` | This is the only content artifact the phase must change. |
| GSD planning artifacts (`PROJECT.md`, `REQUIREMENTS.md`, `STATE.md`, `CONTEXT.md`) | 2026-03 project set | Scope, requirement, and editorial truth | The section plan has to follow locked project decisions instead of ad hoc restructuring. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `rg` | Workspace tool | Verify required headings, concepts, and example mentions | Use during implementation and validation to confirm the new section spine and key phrases exist. |
| `sed` | Workspace tool | Inspect or diff the protected and rewritten portions of the guide | Use for quick structural review around `# Agentic Frameworks` and later sections. |
| `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh` | Current repo script | Check that the protected prefix still matches the Phase 1 snapshot | Run before and after Phase 2 edits so the rewrite cannot silently cross the approved boundary. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Seven-section replacement of the current body | Incremental patching of the existing headings | Faster locally, but it preserves the wrong conceptual spine and makes the guide read like Claude Code notes. |
| Pattern-first structure | Product-first walkthrough | More concrete at first glance, but it violates the locked decision that the guide should not become product documentation. |
| Environment-to-design progression | Topic ordering based on current draft fragments | Easier to reuse text verbatim, but it produces weaker conceptual buildup and a worse handoff to Phase `02.1`. |

**Installation:**
```bash
# No new packages required for Phase 2 research or planning.
```

## Architecture Patterns

### Recommended Project Structure
```text
AgenticAIGuide.md                          # Rewrite content after "# Agentic Frameworks"
.planning/
├── PROJECT.md                             # Project framing and scope
├── REQUIREMENTS.md                        # Requirement truth
├── STATE.md                               # Phase history and locked decisions
└── phases/02-add-the-new-core-sections/
    ├── 2-CONTEXT.md                       # Locked user decisions for Phase 2
    └── 02-RESEARCH.md                     # Planner-facing guidance for the rewrite
```

### Pattern 1: Replace The Spine, Reuse The Parts
**What:** Keep the protected prefix and the two Phase 1 bridge sections, but treat the rest of the post-framework draft as reusable fragments rather than structure.
**When to use:** For all content after `## What The Rest Of This Guide Covers`.
**Example:**
```markdown
## Terminal-Native Agent Environments

The key shift is not "the model can use tools" in the abstract.
It is that the model operates inside a local working environment with files, commands,
permissions, and durable state. That changes what work can be delegated to the system.
```
Source: local project constraints from [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md), [ROADMAP.md](/home/nick/wd/agentic_guide/.planning/ROADMAP.md), and current draft structure in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md)

### Pattern 2: Environment -> Patterns -> Controls -> Design
**What:** Sequence the body so each section depends on the previous one: environment first, then operating loops, then artifacts and skills, then delegation and failure handling, then design synthesis.
**When to use:** For the overall Phase 2 ordering.
**Example:**
```markdown
1. Terminal-native environments
2. Core operating patterns
3. Artifacts as control surfaces
4. Skills and reusable workflows
5. Delegation and parallel subagents
6. Verification, recovery, and failure modes
7. Designing with these patterns
```
Source: synthesized from `STRU-01` through `STRU-07` in [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md) and the Phase 2 specifics in [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md)

### Pattern 3: One Concentrated Claude Code Example
**What:** Use Claude Code for the deepest concrete treatment, but keep that treatment localized to one section or subsection so the document stays generic.
**When to use:** When an abstract concept needs one grounded example, especially around skills, workflow artifacts, or delegation.
**Example:**
```markdown
Claude Code makes the pattern visible because it can inspect a repo, run commands,
write files, and leave behind plans or summaries that shape later steps.
Those artifacts matter more than the product name: they are how control becomes explicit.
```
Source: locked example strategy in [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md) and [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md)

### Pattern 4: Define Phase `02.1` Inputs Without Explaining GSD Yet
**What:** Introduce the concepts Phase `02.1` needs, such as skills, workflows, artifacts, and explicit execution control, without naming or unpacking GSD in detail here.
**When to use:** In the skills, artifacts, and design sections.
**Example:**
```markdown
Once an environment can persist artifacts and invoke reusable workflows,
you can layer a higher-level operating system on top of it.
That layer is not the subject of this section, but the concepts it depends on are.
```
Source: GSD setup constraints in [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md)

### Anti-Patterns to Avoid
- **Claude-Code-as-outline:** Do not keep headings like "What Claude Code is" as the main body structure.
- **Section-per-feature sprawl:** Do not split tools, planning, memory, approvals, and skills into disconnected mini-topics with no conceptual throughline.
- **Premature GSD deep dive:** Do not include skill catalogs, framework internals, or "when to use which skill" guidance in Phase 2.
- **Definition recycling:** Do not spend the new body re-explaining generic definitions already covered before `# Agentic Frameworks`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section ordering | A draft-shaped outline copied from the current headings | The environment-to-design progression implied by `STRU-01` through `STRU-07` | The current headings are incomplete and product-led; they are the wrong backbone for the guide. |
| Concrete examples | Parallel product mini-guides for Claude Code and Codex CLI | One concentrated Claude Code illustration plus brief Codex CLI confirmation | Two deep walkthroughs would bloat the guide and weaken its generality. |
| GSD setup | Early framework-specific explanations | Generic definitions of skills, workflows, artifacts, and execution control | Phase `02.1` needs conceptual groundwork, not stolen scope. |
| Verification | Manual memory of what was protected or replaced | The existing Phase 1 boundary script plus heading-level `rg` checks | This phase is a large rewrite; structure should be checked mechanically. |

**Key insight:** The planner should not optimize for reusing the current prose. It should optimize for replacing the current conceptual backbone with one that teaches how these systems work as operating environments.

## Common Pitfalls

### Pitfall 1: Preserving Too Much Of The Current Draft Structure
**What goes wrong:** The rewrite keeps the current numbered Claude Code sections and only sprinkles in missing concepts.
**Why it happens:** Reusing prose feels efficient, especially when the draft already contains relevant material.
**How to avoid:** Plan around the seven required sections first, then map existing passages into them selectively.
**Warning signs:** Headings still read like a product explainer instead of a pattern guide.

### Pitfall 2: Turning The Phase Into Product Documentation
**What goes wrong:** The guide starts explaining Claude Code behavior, commands, or workflow details as if it were official docs.
**Why it happens:** Claude Code is the deepest example and has the richest existing draft material.
**How to avoid:** Require each concrete example to clarify a general pattern, not to document a feature.
**Warning signs:** Sections answer "what can Claude Code do?" more often than "what pattern does this environment enable?"

### Pitfall 3: Under-Explaining Artifacts
**What goes wrong:** Plans, state files, summaries, and checklists are mentioned as outputs instead of explained as control surfaces.
**Why it happens:** They can look like implementation details rather than design primitives.
**How to avoid:** Give artifacts their own section and tie them directly to execution control, recoverability, and delegation.
**Warning signs:** Artifacts only appear as examples inside other sections and never as a first-class concept.

### Pitfall 4: Weak Phase `02.1` Handoff
**What goes wrong:** Phase 2 mentions skills and workflows vaguely, leaving Phase `02.1` to define them from scratch.
**Why it happens:** The planner may try to avoid all framework-adjacent language to stay generic.
**How to avoid:** Define the concepts cleanly now while explicitly deferring the concrete GSD system to the next phase.
**Warning signs:** Phase 2 can be read without understanding why a workflow framework would exist.

### Pitfall 5: Skipping Failure And Recovery As A Design Topic
**What goes wrong:** Verification gets reduced to "run tests" and the guide misses retries, checkpoints, rollback, and bounded recovery.
**Why it happens:** Happy-path operating patterns are easier to write than failure behavior.
**How to avoid:** Treat failure handling as part of the architecture, not as an appendix.
**Warning signs:** The failure section is short, generic, or detached from artifacts and delegation.

## Code Examples

Verified patterns from project sources:

### Recommended Section Spine
```markdown
## Terminal-Native Agent Environments
## Core Operating Patterns
## Artifacts As Control Surfaces
## Skills And Reusable Workflows
## Delegation And Parallel Subagents
## Verification, Recovery, And Failure Modes
## Designing With These Patterns
```
Source: `STRU-01` through `STRU-07` in [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md) and the Phase 2 structure decision in [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md)

### Artifact-Control Pattern
```markdown
Artifacts are not just outputs left behind by the agent.
They are control surfaces: plans constrain execution, state files preserve intent,
checklists make progress visible, and summaries make handoff and recovery possible.
```
Source: synthesized from the Phase 2 goal in [ROADMAP.md](/home/nick/wd/agentic_guide/.planning/ROADMAP.md), the GSD setup decision in [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md), and reusable draft material in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md)

### Skills Pattern
```markdown
Tools expose raw capabilities.
Skills package repeatable ways of using those capabilities.
Once workflows become reusable, the agent stops improvising every task from scratch.
```
Source: current draft material in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) aligned to `STRU-04` in [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Claude-Code-led explanatory sequence | Pattern-first seven-section body with Claude Code as a concentrated example | Locked by Phase 2 context on 2026-03-20 | The guide teaches transferable operating patterns instead of reading like product notes. |
| Draft preservation after `# Agentic Frameworks` | Free rewrite of the post-framework body while keeping the earlier protected prefix intact | Locked by Phase 2 context on 2026-03-20 | The planner can restructure aggressively without violating the preserved boundary. |
| GSD hinted only implicitly | Skills, workflows, and artifacts defined explicitly as prerequisites for Phase `02.1` | Locked by roadmap/state decisions on 2026-03-19 and Phase 2 context on 2026-03-20 | Phase `02.1` can add the concrete framework example without introducing its core vocabulary from scratch. |

**Deprecated/outdated:**
- The current post-framework heading sequence in [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md): it is useful as source material, not as the final Phase 2 outline.
- Product-first explanation after `# Agentic Frameworks`: it conflicts with the locked pattern-first structure.

## Open Questions

1. **Should the Claude Code deep example live inside the skills section or the operating-patterns section?**
   - What we know: It should be concentrated in one place, not spread across the whole document.
   - What's unclear: Which section gives the cleanest concrete anchor without making the document feel product-led.
   - Recommendation: Let planning keep both options open, but require the example to stay localized and reusable across adjacent sections.

2. **How explicit should the Phase `02.1` handoff be?**
   - What we know: Phase 2 must prepare the concepts Phase `02.1` needs.
   - What's unclear: Whether that handoff should be a closing paragraph in the skills/design material or a lighter implication through terminology.
   - Recommendation: End at least one later section with a short bridge sentence that explains why higher-level workflow frameworks naturally emerge from these primitives.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently configured - docs-only repo using shell checks |
| Config file | none |
| Quick run command | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$" AgenticAIGuide.md` |
| Full suite command | `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## Terminal-Native Agent Environments$|^## Core Operating Patterns$|^## Artifacts As Control Surfaces$|^## Skills And Reusable Workflows$|^## Delegation And Parallel Subagents$|^## Verification, Recovery, And Failure Modes$|^## Designing With These Patterns$|Claude Code|Codex CLI|artifact|workflow|delegat|recover|failure" AgenticAIGuide.md` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| STRU-01 | Environment section exists and frames the local execution environment as the core subject | smoke | `rg -n "^## Terminal-Native Agent Environments$|filesystem|shell|persistent artifact" AgenticAIGuide.md` | ✅ |
| STRU-02 | Operating-patterns section explains inspect/plan/act/check style loops | smoke | `rg -n "^## Core Operating Patterns$|plan|iterate|verify|loop" AgenticAIGuide.md` | ✅ |
| STRU-03 | Artifact section treats files and plans as control surfaces | smoke | `rg -n "^## Artifacts As Control Surfaces$|control surface|plan|state|summary|checklist" AgenticAIGuide.md` | ✅ |
| STRU-04 | Skills/workflows section defines reusable orchestration clearly | smoke | `rg -n "^## Skills And Reusable Workflows$|skill|workflow|reusable" AgenticAIGuide.md` | ✅ |
| STRU-05 | Delegation section covers scoped sub-work and parallelism | smoke | `rg -n "^## Delegation And Parallel Subagents$|subagent|parallel|delegate" AgenticAIGuide.md` | ✅ |
| STRU-06 | Failure section covers verification, recovery, and bounded failure handling | smoke | `rg -n "^## Verification, Recovery, And Failure Modes$|verify|recovery|failure|retry|rollback" AgenticAIGuide.md` | ✅ |
| STRU-07 | Design section synthesizes the prior patterns into guidance | smoke | `rg -n "^## Designing With These Patterns$|design|compose|system|workflow" AgenticAIGuide.md` | ✅ |

### Sampling Rate
- **Per task commit:** `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && rg -n "^## " AgenticAIGuide.md`
- **Per wave merge:** `.planning/phases/01-frame-the-guide/verify-protected-boundary.sh && sed -n '252,$p' AgenticAIGuide.md`
- **Phase gate:** Protected boundary script passes and manual read confirms the body is pattern-first, not a product walkthrough

### Wave 0 Gaps
- [ ] No docs-specific structural verification script yet for the new seven-section spine; current validation is shell-command based only.
- [ ] No automated style/scope checker for "pattern-first, not product-doc" framing; that remains manual review.

## Sources

### Primary (HIGH confidence)
- [2-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/02-add-the-new-core-sections/2-CONTEXT.md) - locked Phase 2 decisions, rewrite scope, and GSD handoff constraints
- [REQUIREMENTS.md](/home/nick/wd/agentic_guide/.planning/REQUIREMENTS.md) - structural requirements `STRU-01` through `STRU-07`
- [STATE.md](/home/nick/wd/agentic_guide/.planning/STATE.md) - roadmap evolution and locked decision that GSD belongs in Phase `02.1`
- [PROJECT.md](/home/nick/wd/agentic_guide/.planning/PROJECT.md) - project scope, editorial limits, and example strategy
- [ROADMAP.md](/home/nick/wd/agentic_guide/.planning/ROADMAP.md) - Phase 2 goal and success criteria
- [1-CONTEXT.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/1-CONTEXT.md) - Phase 1 framing decisions that still constrain Phase 2
- [01-framing-contract.md](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/01-framing-contract.md) - protected-boundary and post-framework writing contract
- [AgenticAIGuide.md](/home/nick/wd/agentic_guide/AgenticAIGuide.md) - current draft structure and reusable raw material
- [verify-protected-boundary.sh](/home/nick/wd/agentic_guide/.planning/phases/01-frame-the-guide/verify-protected-boundary.sh) - existing preservation verification for the protected prefix

### Secondary (MEDIUM confidence)
- None

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - this phase is a docs rewrite in an already-established markdown and GSD-planning repo
- Architecture: HIGH - the required section set and pattern-first structure are directly locked by project artifacts
- Pitfalls: HIGH - the main failure modes are visible in the current draft and explicitly constrained by Phase 1 and Phase 2 context

**Research date:** 2026-03-20
**Valid until:** 2026-04-19
