=== Agentic AI ===

# I. Agentic AI (the behavior)

Agentic AI refers to **AI systems that act toward goals through multi-step reasoning and tool use**.

Core properties:

1. **Goal-directed behavior**
   Primarily, the system is given an objective, rather than a series of prompts.

2. **Iterative decision-making**
   Most patterns repeat through: perceive → plan → act → evaluate/verify. (Note that this loop may span many levels, and lots of nested subprocesses.)

3. **Tool use**
   APIs, databases, search, code execution, etc.

4. **State persistence**
   Memory, context tracking, or environment state.

5. **Autonomy (partial or full)**
   The system decides what to do next rather than being strictly scripted.

---

# II. Agentic Engineering (the discipline)

Agentic engineering is the **software engineering practice required to build agentic systems that actually work in production**.

It deals with problems like:

## 1. Control of the agent loop

* planning structure
* termination conditions
* retry logic
* tool routing
* guardrails

## 2. Reliability

Agents fail constantly without structure.

Engineering solves:

* hallucinated tool calls
* runaway loops
* brittle planning
* context explosion
* tool misuse

## 3. Observability

You need visibility into:

* reasoning traces
* tool decisions
* intermediate outputs
* failures

Without this, debugging is impossible.

## 4. Evaluation

You need systematic evaluation:

* trajectory evaluation
* step correctness
* task completion
* cost vs performance

## 5. Cost control

Agents burn tokens rapidly.

Engineering must manage:

* model routing
* caching
* step pruning
* planning depth

## 6. Architecture

Agent systems require explicit architecture:

* memory
* tools
* planning modules
* evaluators
* policies
* orchestration

Without architecture, the system collapses into prompt spaghetti.

---

# III. Definitions

## Agent

An **agent** is a system that:

1. receives a goal
2. decides actions
3. executes them through tools
4. observes results
5. repeats until completion.

Agents operate through **loops**.

---

## Agent harness

The **agent harness** is the **execution environment that runs the agent loop**.

It manages:

* the reasoning loop
* tool invocation
* state
* memory
* stopping conditions
* safety rules

The harness is the **control system around the model**.

Examples of harness implementations:

* Claude Code runtime
* LangGraph loops
* OpenAI agent frameworks
* custom orchestrators

---

## Tools

**Tools are executable capabilities available to the agent.**

Examples:

* search files
* edit file
* run bash command
* call API
* query database
* run tests

Tools convert the agent from _text generator_ into _system operator_.

Tools are usually exposed through structured interfaces.

```
{
  "name": "get_weather",
  "description": "Get the current weather for a city.",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name, e.g. Athens"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"]
      }
    },
    "required": ["city"],
    "additionalProperties": false
  }
}
```


---

## Skills

**Skills are reusable high-level behaviors.**

Think of them as:

**mini-workflows the agent can reuse.**

While tools determine how to use external capabilities, skills define internal orchestration for the LLM.

Example:

### Example skill: “gsd-map-codebase”


Objective:

Scan an existing repo and produce a lightweight architectural map under .planning/codebase/

```
---
name: "gsd-map-codebase"
description: "Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents"
metadata:
  short-description: "Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents"
---

Steps:

1. Run the workflow in .codex/get-shit-done/workflows/map-codebase.md
2. Check for existing .planning/STATE.md and whether .planning/codebase/ already exists
3. Spawn 4 parallel gsd-codebase-mapper subagents, each with a different lens (tech/arch/quality/concerns). Agents write files directly to disk, and the orchestrator only collects “done” confirmations. Outputs (7 docs) are STACK.md, INTEGRATIONS.md, ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md in .planning/codebase/
4. Verify the 7 files exist (with line counts)
5. Commit the codebase map
6. Suggests next steps (often gsd-new-project or gsd-plan-phase).
```

The agent invokes the skill instead of planning each step.
This is increasingly important for **scaling agent systems**.

---

## Memory

Agent systems often include **persistent memory**.

Two main types:

### Short-term memory

Stored in the current context window.

Examples:

* current task
* recent steps
* reasoning traces

### Long-term memory

External storage.

Examples:

* vector databases
* knowledge graphs
* workflow history

This allows learning across tasks.

---

# Agentic Frameworks

Agentic frameworks matter here as concrete harnesses for local tool-using work. The most revealing examples are the terminal-native ones, because they expose the environment, permissions, artifacts, and execution rules directly instead of hiding them behind a UI. Claude Code is the main concrete example in this guide, with Codex CLI as a second example showing that the pattern is not tied to one product.

## From Frameworks To Environments

This guide is about local tool-using agents, not agentic AI in general. The distinctive subject is the local execution environment: the point where the model stops being only a reasoning component and starts operating inside a working system. In that environment, the model gets filesystem access, shell access, structured tools, and persistent artifacts. Claude Code and Codex CLI are concrete examples of this pattern, not the subject of product documentation.

## What The Rest Of This Guide Covers

The rest of this guide focuses on operating patterns, artifacts, skills, delegation, verification, and design. Claude Code will serve as the deeper concrete example at least once so the pattern is easy to see in one real environment, while Codex CLI will serve as a confirming example showing that the pattern generalizes. This is not a tutorial, comparison matrix, or provider survey.

---

## Terminal-Native Agent Environments

The important shift is not that a model can call a tool in the abstract. It is that the model operates inside a local working environment with a filesystem, a shell, structured tools, permission boundaries, and durable working state. Once those pieces exist together, the model stops acting like a detached text generator and starts acting like an operator inside a real system.

That environment matters because it gives the agent something concrete to inspect and change. Files can be read and rewritten. Commands can expose build output, test failures, or repository structure. Structured tools can constrain how search, edits, and execution happen. Permissions determine which actions are automatic, which require approval, and which are blocked entirely. Durable working state means the system can leave behind plans, task files, and status markers that survive beyond one response.

This is why terminal-native agents feel different from plain chat. The model is not only predicting text about the task. It is grounded in the task's actual workspace and can operate on the same project surfaces a human operator would use. Claude Code is a clear example because it can inspect repositories, run commands, and write artifacts in the local environment. Codex CLI confirms that the pattern is broader than one product: the important part is the environment contract, not the brand.

## Core Operating Patterns

Once the environment is in place, the work inside it tends to converge on the same loop: inspect, plan, act, check, iterate. This is not abstract AI theory. It is the practical rhythm of making changes in a repository without losing control.

Inspect means looking at the current state before making assumptions: reading files, searching for handlers, listing directories, checking config, or reviewing prior notes. Plan means turning that inspection into an explicit next-step sequence instead of improvising every move. Act means editing files, running commands, creating artifacts, or invoking other tools. Check means comparing the result against the actual system by running tests, reading errors, or validating the changed files. Iterate means using that feedback to tighten the plan and continue until the task is actually complete.

In real repo work, the loop might look like this: inspect the authentication flow, plan a rate-limiting change, act by editing middleware and tests, check by running the relevant suite, then iterate when the first pass exposes a missed edge case. The value is not that the loop exists. The value is that the environment gives each stage concrete feedback. Plans can be compared against files, actions can be checked against commands, and the next iteration is driven by system evidence rather than optimism.

## Artifacts As Control Surfaces

That loop becomes much more reliable once execution is shaped by durable artifacts. Plans, task files, summaries, state files, and checklists are not just logs left behind by the work. They are control surfaces that influence what happens next.

A plan constrains the action space by making intended steps explicit. A task file can scope one unit of work so execution does not drift across unrelated problems. A summary records what changed, what was verified, and what still needs attention, which makes handoff and recovery possible. A state file preserves position across sessions so the agent or operator knows what phase is active and which decisions are already locked. A checklist turns vague completion into visible criteria that can be checked instead of guessed.

These artifacts matter because local-agent work is long-running and interruptible. The system needs ways to preserve intent outside the model's short-term context window. When Claude Code writes a plan before editing or leaves a summary after execution, the artifact is doing real coordination work. When a Codex CLI workflow reads a state file before continuing, the same pattern appears again. The artifact is not incidental output. It is part of the control system that keeps execution legible, resumable, and bounded.

## Skills And Reusable Workflows

Once artifacts can preserve and transmit intent, the next layer is reuse. Tools expose raw capabilities. Skills package repeatable ways of using those capabilities inside the environment. A skill is not just "the agent knows how to do something." It is a reusable operating pattern with a defined objective, expected inputs, execution steps, and verification behavior. Workflows sit one level above that: they orchestrate multiple steps or multiple skills so the system does not have to improvise the whole path from scratch every time.

This matters because terminal-native agent work quickly becomes too large for pure on-the-fly reasoning. Reusable workflows reduce drift, make expected outputs explicit, and preserve successful execution patterns across tasks. Instead of rediscovering how to map a codebase, add a phase, or verify a change each time, the system can invoke a packaged routine that already knows which artifacts to read, which checks to run, and which outputs to produce.

Claude Code makes the pattern easy to see when it follows a structured repo task: inspect the codebase, write a plan, execute scoped changes, run verification, and record what happened. The important insight is not the product feature list. It is that the work becomes more reliable when those steps are treated as a reusable workflow rather than a fresh improvisation. Codex CLI shows the same general idea when operators layer repeatable scripts, prompts, or repo conventions on top of the base tool contract.

Once skills, artifacts, and execution checks become reusable, a higher-level workflow framework becomes the natural next layer. That later layer is not the subject here, but it depends on these primitives being explicit first.

## Delegation And Parallel Subagents

Once workflows are explicit, delegation becomes practical rather than mystical. It is the deliberate act of carving a larger objective into smaller scoped units of work and assigning those units bounded context, expected outputs, and a verification path. In a terminal-native environment, that usually means giving a subagent a narrow task, the specific files or artifacts it should read, the constraints it must respect, and the form of the result it should return.

Good delegation depends on artifact-backed decomposition. A parent agent can create a task file, pass along the current plan, point to the relevant state file, and require a summary on completion. Those artifacts keep the delegated work aligned with the main objective and make the result reviewable when control returns. Without them, sub-work becomes opaque and parallel execution turns into guesswork.

Parallel subagents matter because many repo tasks separate cleanly: one agent can inspect tests while another reviews implementation details, or one can draft a migration note while another verifies the changed commands. The gain does not come from spawning more reasoning at random. It comes from choosing explicit boundaries, keeping each subagent's context narrow, and using summaries and checklists to merge the work safely. Delegation, in other words, is an orchestration choice built on top of environment access, reusable workflows, and durable control surfaces.

## Verification, Recovery, And Failure Modes

Delegation only scales if the system can tell the difference between progress and damage. Reliable local-agent systems do not treat verification as cleanup after the interesting work is done. Checking the result is part of the operating environment itself. If an agent can read files, run commands, and change a repository, it also needs explicit ways to test those changes, compare outputs against expectations, surface failures, and decide what happens next.

That is why verification, retries, rollback, and bounded recovery belong in the same mental model as tools and artifacts. A good environment exposes the checks that matter: run the targeted test suite, inspect the diff, confirm the protected boundary still holds, compare generated files against a contract, or require a review step before continuing. When a check fails, the system should not hide that failure behind confident prose. It should make the failure visible, preserve the evidence, and constrain the next action.

Recovery works best when it is explicit and limited. Retry only when the system has learned something from the last attempt. Roll back when a change is clearly wrong or when a checkpoint proves the current path is unsafe. Use summaries, state files, and checklists to record what failed, what was restored, and what remains unresolved. Bounded recovery matters because an agent that can always "just try again" can also drift, damage unrelated work, or bury the real problem under repeated edits.

The same logic applies to delegated work. A subagent should not return only an answer. It should return evidence: what it changed, what it checked, what failed, and whether the result is ready to merge back into the parent task. Reliable systems expose these controls on purpose. They make success verifiable, failure visible, and recovery legible.

## Designing With These Patterns

Taken together, these patterns describe an operating system for local agents rather than a bag of isolated features. The environment provides the working surface. Operating loops turn that surface into disciplined action. Artifacts preserve intent and control execution across time. Skills and workflows reduce improvisation. Delegation scales the work through bounded sub-tasks. Verification and recovery keep the whole system honest when reality pushes back.

Designing with these patterns means deciding how those pieces reinforce each other. Which artifacts define scope before work starts? Which checks are mandatory before a task is considered done? Which workflows are common enough to package as reusable skills? Which tasks are safe to delegate in parallel, and what evidence must come back before their output is trusted? Those are design questions, not product questions.

Claude Code and Codex CLI help make the pattern concrete because they show that the useful unit is not a chat session but a controlled local environment with tools, permissions, artifacts, and execution rules. The important design move is to compose those elements so the agent can act productively without becoming opaque or unbounded.

Once that vocabulary is clear, higher-level workflow frameworks become easier to reason about. They are built from the same primitives: environments, artifacts, reusable workflows, scoped delegation, and explicit verification. That is the bridge into the next layer of the guide.

## GSD As A Workflow Framework

GSD (Get Shit Done) is a workflow framework layered on top of a local tool-using agent environment. It does not replace the environment-level contract described above. It assumes that contract already exists: the agent can read and write artifacts, run bounded commands, reuse higher-level workflows, delegate scoped work, and verify outcomes against the actual workspace.

What GSD adds is a stronger operating structure around those local-agent primitives. Instead of treating planning, execution, validation, and workflow control as habits the operator must recreate every time, it turns them into explicit artifacts and reusable skills. Phase files, state files, summaries, requirement maps, and execution workflows become part of the control surface, not just notes left behind after the fact.

That is the important layer boundary. Claude Code or Codex CLI gives the agent an environment in which work can happen; GSD sits above that layer and organizes how work moves from discovery into planning, execution, verification, and maintenance. In other words, it is a concrete example of what happens when the patterns from Phase 2 are packaged into a repeatable workflow system.

### A Short GSD Lifecycle Walkthrough

`gsd-progress` is the usual starting point because it surfaces the current project state, open phase position, and what kind of work is already in motion. If the repo still needs shared context, `gsd-map-codebase` turns the raw codebase into a durable map the later planning steps can reuse instead of rediscovering structure on each pass.

From there, `gsd-discuss-phase` narrows a phase to a clear objective and boundary, and `gsd-research-phase` gathers the implementation evidence needed to make that scope defensible. `gsd-plan-phase` then turns that material into explicit execution artifacts, so planning stops being implicit operator memory and becomes part of the workflow's visible state.

Once the phase is defined, `gsd-execute-phase` carries the work through implementation with the plan, task boundaries, and verification hooks already attached. `gsd-add-tests` extends that execution path by making missing coverage explicit rather than leaving correctness to a final hopeful check.

After implementation, `gsd-verify-work` closes the loop at the user-facing level by checking whether the built result actually behaves as intended, while `gsd-validate-phase` audits whether the phase met its own structural and verification contract. A continuity skill such as `gsd-pause-work` or `gsd-complete-milestone` then makes workflow control explicit again by either preserving resumable state or formally closing the current slice of work.

### Full GSD Skill Reference

The walkthrough shows the main lifecycle path. The broader framework exposes a larger skill surface around that path so setup, planning, execution, validation, continuity, and maintenance remain explicit parts of the operating model.

#### Project Setup And Configuration

- `gsd-new-project`: Initialize a new project with deep context gathering and `PROJECT.md`.
- `gsd-new-milestone`: Start a new milestone cycle, update `PROJECT.md`, and route to requirements.
- `gsd-settings`: Configure GSD workflow toggles and model profile.
- `gsd-set-profile`: Switch model profile for GSD agents.
- `gsd-help`: Show available GSD commands and usage guide.
- `gsd-update`: Update GSD to the latest version with changelog display.
- `gsd-health`: Diagnose planning-directory health and optionally repair issues.

#### Discovery And Planning

- `gsd-progress`: Check project progress, show context, and route to the next action.
- `gsd-map-codebase`: Analyze a codebase with parallel mapper agents to produce `.planning/codebase/` documents.
- `gsd-discuss-phase`: Gather phase context through adaptive questioning before planning.
- `gsd-list-phase-assumptions`: Surface assumptions about a phase approach before planning.
- `gsd-research-phase`: Research how to implement a phase as a standalone discovery step.
- `gsd-plan-phase`: Create a detailed phase plan with a verification loop.
- `gsd-ui-phase`: Generate a UI design contract (`UI-SPEC.md`) for frontend phases.
- `gsd-plan-milestone-gaps`: Create phases that close gaps found in milestone auditing.

#### Execution And Debugging

- `gsd-execute-phase`: Execute all plans in a phase with wave-based parallelization.
- `gsd-quick`: Execute a quick task with GSD guarantees while skipping optional agents.
- `gsd-debug`: Run a systematic debugging flow with persistent state across context resets.
- `gsd-autonomous`: Run all remaining phases autonomously through discuss, plan, and execute.
- `gsd-add-tests`: Generate tests for a completed phase from UAT criteria and implementation.
- `gsd-reapply-patches`: Reapply local modifications after a GSD update.

#### Validation And Review

- `gsd-verify-work`: Validate built features through conversational UAT.
- `gsd-validate-phase`: Retroactively audit and fill Nyquist validation gaps for a completed phase.
- `gsd-ui-review`: Run a retroactive six-pillar visual audit of implemented frontend code.
- `gsd-audit-milestone`: Audit milestone completion against original intent before archiving.

#### Roadmap And Milestone Maintenance

- `gsd-add-phase`: Add a phase to the end of the current milestone in the roadmap.
- `gsd-insert-phase`: Insert urgent work as a decimal phase between existing phases.
- `gsd-remove-phase`: Remove a future phase from the roadmap and renumber later phases.
- `gsd-complete-milestone`: Archive a completed milestone and prepare for the next version.
- `gsd-cleanup`: Archive accumulated phase directories from completed milestones.

#### Continuity And Utilities

- `gsd-pause-work`: Create a context handoff when pausing work mid-phase.
- `gsd-resume-work`: Resume work from a previous session with full context restoration.
- `gsd-add-todo`: Capture an idea or task as a todo from the current conversation context.
- `gsd-check-todos`: List pending todos and select one to work on.
- `gsd-stats`: Display project statistics across phases, plans, requirements, git metrics, and timeline.
- `gsd-join-discord`: Join the GSD Discord community.
