## Contents

- [Introduction](#introduction)
  - [What This Guide Covers](#what-this-guide-covers)
  - [TL;DR](#tl;dr)
- [I. Agentic AI (the behavior)](#i-agentic-ai-the-behavior)
- [II. Agentic Engineering (the discipline)](#ii-agentic-engineering-the-discipline)
  - [Control of the loop](#control-of-the-loop)
  - [Reliability](#reliability)
  - [Observability](#observability)
  - [Evaluation](#evaluation)
  - [Cost control](#cost-control)
  - [Architecture](#architecture)
- [III. Definitions](#iii-definitions)
  - [Agent](#agent)
  - [Agent harness](#agent-harness)
  - [Tools](#tools)
  - [Skills](#skills)
    - [Example skill: `gsd-map-codebase`](#example-skill-gsd-map-codebase)
  - [Memory](#memory)
    - [Short-term memory](#short-term-memory)
    - [Long-term memory](#long-term-memory)
- [IV. Agentic Frameworks](#iv-agentic-frameworks)
  - [Terminal-Native Agent Environments](#terminal-native-agent-environments)
  - [The Core Operating Loop](#the-core-operating-loop)
  - [Artifacts As Control Surfaces](#artifacts-as-control-surfaces)
  - [Skills And Reusable Workflows](#skills-and-reusable-workflows)
  - [Delegation And Parallel Work](#delegation-and-parallel-work)
  - [Verification, Recovery, And Failure Modes](#verification-recovery-and-failure-modes)
  - [Design Implication](#design-implication)
- [V. Claude Code](#v-claude-code)
  - [Why Claude Code Is A Good Reference Example](#why-claude-code-is-a-good-reference-example)
  - [The Basic Execution Model](#the-basic-execution-model)
  - [Filesystem Access](#filesystem-access)
  - [Shell Access](#shell-access)
  - [Shell And Structured Tools](#shell-and-structured-tools)
  - [Permissions And Approval Boundaries](#permissions-and-approval-boundaries)
  - [Artifacts And Continuity](#artifacts-and-continuity)
  - [Delegation And Subagents](#delegation-and-subagents)
  - [The Real Working Rhythm](#the-real-working-rhythm)
  - [Why Claude Code Feels Different From Chat](#why-claude-code-feels-different-from-chat)
  - [Common Failure Modes](#common-failure-modes)
  - [Effective Usage Patterns for Larger Tasks](#effective-usage-patterns-for-larger-tasks)
- [VI. Context Window Management](#vi-context-window-management)
  - [The Tradeoff: Sufficiency vs Bloat](#the-tradeoff-sufficiency-vs-bloat)
  - [What The Model Actually Has Access To](#what-the-model-actually-has-access-to)
  - [The Real Failure Modes](#the-real-failure-modes)
  - [What "Context Window Management" Means](#what-context-window-management-means)
  - [The Two Context Layers](#the-two-context-layers)
    - [1. Active Context (in-window)](#1-active-context-in-window)
    - [2. Durable Context (externalized)](#2-durable-context-externalized)
  - [Design Implications](#design-implications)
  - [Practical Patterns](#practical-patterns)
- [VII. Spec-Driven Engineering](#vii-spec-driven-engineering)
  - [Framing](#framing)
  - [Research](#research)
  - [Workflow Design](#workflow-design)
  - [Specs](#specs)
- [VIII. GSD As A Workflow Framework](#viii-gsd-as-a-workflow-framework)
  - [What GSD Adds](#what-gsd-adds)
  - [The Core GSD Lifecycle](#the-core-gsd-lifecycle)
  - [Why GSD Matters](#why-gsd-matters)
  - [GSD Internals](#gsd-internals)
  - [GSD Skill Reference](#gsd-skill-reference)
    - [Project Setup And Configuration](#project-setup-and-configuration)
    - [Discovery And Planning](#discovery-and-planning)
    - [Execution And Debugging](#execution-and-debugging)
    - [Validation And Review](#validation-and-review)
    - [Roadmap And Milestone Maintenance](#roadmap-and-milestone-maintenance)
    - [Continuity And Utilities](#continuity-and-utilities)
  - [Alternatives](#alternatives)
- [Further Study](#further-study)

# Introduction

This guide is about **agentic engineering in local, tool-using environments**.

More specifically, it is about understanding and using **development-time terminal-native agents**: systems where a model is not only generating text, but is _operating inside a real workspace with files, commands, tools, permissions, and durable artifacts_.

The focus of this guide may be on development work, however, _production-system agents_ have many of the same concerns: context window management, agent harnesses, durable storage surfaces such as the local filesystem, broad tool access through interfaces such as the command-line interface (CLI), skills, spec-driven engineering, and complex, often dynamic, workflow design.

Understanding the local development environment also helps clarify how production agents with similar capabilities are designed. The aim of this guide is to assist engineers in both of these fields of work.

Also note that a common pattern arising is _using development-time agents to build production-system agents_.

## What This Guide Covers

The guide covers:

- the fundamental concepts in agentic engineering
- the structure of terminal-native agent environments
- Claude Code as a detailed concrete harness example
- context management
- spec-driven engineering
- GSD as a high-level workflow-design framework

## TL;DR

The quick picture is:

- we have an orchestrator that loops through tool-calling LLM calls and decides what to do next; that is the agent
- the agent has access to terminal commands and a local filesystem where it offloads context; that makes it powerful
- certain tools like Claude Code implement this model
- large tasks require precise planning, so structured practices are needed to take us:
  - from _intent_
  - to _design_
  - to _execution plan_
  - to _execution_
  - to _verification_
- that is why tools like GSD, which sit on top of harnesses such as Claude Code, are used to apply a spec-driven engineering approach

---

# I. Agentic AI (the behavior)

Agentic AI refers to **AI systems that act toward goals through multi-step reasoning and tool use**.

Core properties:

1. **Goal-directed behavior**
   The system is given an objective, not just a prompt.

2. **Iterative decision-making**
   Most systems repeat some version of perceive -> plan -> act -> evaluate.

3. **Tool use**
   APIs, databases, search, code execution, browsers, shells.

4. **State persistence**
   Memory, context tracking, or environment state.

5. **Autonomy**
   The system decides what to do next instead of following a fixed script.

Those properties describe the behavior. The next question is what it takes to make that behavior controllable inside a real working environment.

---

# II. Agentic Engineering (the discipline)

Agentic engineering is the **software engineering discipline required to make agentic systems useful, controllable, and reliable**.

An agentic system is not acting in the abstract. It is operating through explicit loops, tools, permissions, and checks in a real workspace.

It therefore deals with:

## Control of the loop

- planning structure
- stopping conditions
- retry logic
- tool routing
- guardrails

## Reliability

- hallucinated tool calls
- runaway loops
- brittle plans
- context explosion
- tool misuse

## Observability

- traces
- tool decisions
- intermediate outputs
- failures

## Evaluation

- step correctness
- task completion
- cost vs performance
- trajectory quality

## Cost control

- model routing
- caching
- pruning
- bounded depth

## Architecture

- memory
- tools
- planners
- evaluators
- policies
- orchestration

Without explicit engineering, the system degrades into improvisation: unclear loops, weak boundaries, and unreliable outcomes.

---

# III. Definitions

## Agent

An **agent** is a system that:

1. receives a goal
2. decides actions
3. executes them through tools
4. observes results
5. repeats until completion

What makes this an agent rather than a plain tool-using LLM call is the loop and the ability to decide what action to do next.

---

## Agent harness

The **agent harness** is the execution environment that runs the agent loop.

It manages:

- reasoning flow
- tool invocation
- state
- memory
- stopping conditions
- safety rules

The harness is the control system around the model: it is what turns model capability into bounded behavior.

Examples:

- Claude Code runtime
- OpenAI agent frameworks
- LangGraph loops
- custom orchestrators (e.g., using n8n)

---

## Tools

**Tools are executable capabilities available to the agent.**

Examples:

- search files
- edit files
- run bash commands
- call APIs
- query databases
- run tests

Tools convert the model from a text generator into a system operator.

Tools are usually exposed through structured interfaces.

```json
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

Tools expose capabilities. Skills package repeatable ways of working: steps, constraints, reasoning patterns, and tool usage.

A skill usually defines:

- an objective
- required inputs
- execution steps
- expected outputs
- verification behavior

### Example skill: `gsd-map-codebase`

Objective:

Scan an existing repo and produce a lightweight architectural map under `.planning/codebase/`.

```yaml
---
name: "gsd-map-codebase"
description: "Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents"
metadata:
  short-description: "Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents"
---

Steps:

1. Run the workflow in .codex/gsd/workflows/map-codebase.md
2. Check for existing .planning/STATE.md and whether .planning/codebase/ already exists
3. Spawn 4 parallel gsd-codebase-mapper subagents with different lenses
4. Verify the expected output files exist
5. Commit the codebase map
6. Suggest the next workflow step
```

The point is reuse: the system invokes the skill instead of rebuilding the whole procedure from scratch.

---

## Memory

Agent systems often include persistent memory.

### Short-term memory

Stored in the current context window.

Examples:

- current task
- recent steps
- temporary reasoning state

### Long-term memory

Stored outside the current context window.

Examples:

- planning artifacts
- durable repo artifacts
- workflow history
- documentation
- vector databases

---

# IV. Agentic Frameworks

The important shift in **local tool-using agent environments** is that the model operates inside a real workspace it can inspect and change.

Claude Code and Codex CLI are useful examples because they make this contract visible. This section stays at the environment layer. The next section shows what the same pattern looks like inside one concrete harness, Claude Code.

## Terminal-Native Agent Environments

A terminal-native agent environment usually includes:

- a filesystem
- a shell
- structured tools
- permission boundaries
- durable artifacts

That changes the nature of the work. The system is no longer only generating text about the task. It is operating on the task's actual surfaces, with real state and real consequences.

## The Core Operating Loop

Most real work converges on the same loop:

1. inspect
2. plan
3. act
4. check
5. iterate

In practice:

- `inspect`: read files, search the repo, review config, inspect current state
- `plan`: turn findings into explicit next steps
- `act`: edit files, run commands, call tools, create artifacts
- `check`: run tests, inspect output, review diffs, validate contracts
- `iterate`: adjust based on evidence

This is still the pattern layer. The point is not that every harness looks identical. The point is that local-agent work repeatedly converges on this kind of inspect-plan-act-check loop.

## Artifacts As Control Surfaces

Artifacts are not just logs. They shape execution.

Common control artifacts:

- `plan`: defines intended steps
- `task file`: scopes a unit of work
- `summary`: records what changed and what was verified
- `state file`: preserves position across sessions
- `checklist`: turns "done" into explicit criteria

Artifacts matter because local-agent work is long-running, interruptible, and often collaborative across multiple turns or agents.

## Skills And Reusable Workflows

Tools expose primitives. Skills and workflows package repeatable operating patterns.

Why this matters at the environment layer:

- efficiency
- less improvisation
- less drift
- more predictable outputs
- easier verification

## Delegation And Parallel Work

Delegation is scoped decomposition. The main orchestrator agent can decompose work and delegate it to sub-agents that it spawns on the fly.

Good delegated work includes:

- a narrow task
- exact files or artifacts to read
- constraints
- expected output format
- a verification path

Parallelism helps when boundaries are clean. It hurts when tasks overlap.

## Verification, Recovery, And Failure Modes

Verification is part of execution, not cleanup after it.

Typical checks:

- targeted tests
- diff inspection
- boundary checks
- contract checks
- review gates

Recovery should be bounded:

- retry only when new evidence changes the plan
- roll back when the path is clearly wrong
- record what failed and what was restored

## Design Implication

A strong agent environment gives the model:

- a real workspace
- explicit loops
- durable artifacts
- reusable workflows
- scoped delegation
- visible verification

When these are weak, the system becomes opaque. When they are explicit, the system becomes controllable.

That is the setup for the next section. Section `# V` is what those abstractions look like inside one concrete terminal-native harness.

---

# V. Claude Code

## Why Claude Code Is A Good Reference Example

Claude Code makes five important things visible:

1. the model works inside a real working directory
2. the model can inspect and modify files
3. the model can run shell commands
4. the model is constrained by permissions and approval rules
5. the model can create durable artifacts that survive the current turn

## The Basic Execution Model

At a high level, Claude Code behaves like this:

1. receive a user goal
2. inspect the local workspace
3. form or update a plan
4. execute bounded actions through tools
5. check the result against the real system
6. continue until the task is complete or blocked

This is much closer to supervised systems work than to plain chat.

## Filesystem Access

In Claude Code, filesystem access grounds the model in real project state instead of inferred project state.

With filesystem access, the system can:

- read source files instead of guessing
- inspect config instead of inferring it
- compare versions directly
- update code and docs in place
- leave behind plans, summaries, and handoff files

That is why local-agent work can be cumulative. The important state is not only inside the model's context window. It also exists on disk in the repository and in the artifacts the harness leaves behind.

## Shell Access

In Claude Code, shell access turns the environment from a read/write document surface into an execution surface.

With shell access, the system can:

- list directories
- search codebases
- run tests
- inspect build failures
- check git state
- run project-specific tooling

This matters because the harness gives the model direct feedback from the real system. A failing test, a bad exit code, or a compiler error is more reliable than generated prose about what probably happened.

## Shell And Structured Tools

Claude Code is not only "a model with bash." It also exposes structured tools with narrower contracts for actions that benefit from more explicit boundaries.

Structured tools matter because they:

- reduce ambiguity
- constrain inputs
- constrain outputs
- make certain actions safer than arbitrary shell usage
- expose intent more clearly than free-form text

This is a major part of agent engineering: choosing when to rely on open-ended shell power and when to use narrower tool interfaces.

## Permissions And Approval Boundaries

Claude Code makes permission boundaries part of the working model.

In practice that means actions may fall into categories such as:

- allowed automatically
- allowed only inside a sandbox
- allowed only with user approval
- blocked entirely

This is not incidental friction. It is part of the system design.

A capable harness should make it clear:

- what the model can do immediately
- what requires confirmation
- what cannot be done
- why the boundary exists

Without this, autonomy becomes unsafe very quickly.

## Artifacts And Continuity

One of the most important properties of Claude Code-style work is that it can accumulate durable artifacts while the task is in progress.

Examples:

- a plan file before execution
- a summary file after execution
- a state file for resumability
- a checklist for verification
- a patch or diff for human review

These artifacts do real coordination work. They preserve intent, support recovery, and make handoff possible inside one harness session and across later sessions.

## Delegation And Subagents

Claude Code-style environments often support explicit delegation.

Delegation works well when the parent agent gives a subagent:

- a narrow objective
- the exact context it needs
- a bounded write scope
- success criteria
- a return format

This makes parallel work practical. Without those boundaries, delegation becomes noisy.

## The Real Working Rhythm

In a strong Claude Code workflow, the model does not jump straight from request to edit.

A more reliable rhythm looks like:

1. inspect first
2. state assumptions
3. decide the next bounded action
4. execute
5. verify
6. summarize what changed

## Why Claude Code Feels Different From Chat

Plain chat is mostly advisory. Claude Code-style work is operational.

The system is not only describing what should happen in theory. It can:

- inspect the actual repo
- change the actual repo
- run the actual commands
- collect actual failures
- leave behind actual artifacts

That is the key difference.

## Common Failure Modes

Claude Code does not remove failure.

Common problems:

- acting on incomplete inspection
- editing too broadly
- trusting a plan that should be revised
- hiding failed checks behind confident language
- delegating overlapping work
- losing control of scope

This is why the surrounding engineering matters so much: more capability means the failure modes become more consequential.
Preventing these failures requires more than a capable harness. It requires an organized workflow that makes state, scope, verification, and next actions explicit rather than implicit.

## Effective Usage Patterns for Larger Tasks

Claude Code can be very effective, but larger projects introduce two requirements that must be handled explicitly.

These are:

- context window management, especially in order to avoid context bloat, which is the situation where the context window is so full that the LLM is struggling to work with all that unfocused context
- effective orchestration, because the longer a task runs, the more opportunity is there to veer off the intended direction

One of the developer's main responsibilities in this style of work is understanding context: both the internal context window and the durable, externalized context stored in files, plans, and other artifacts. Part of learning this is practical. You have to work this way, manage the lifecycle across a few short projects, and see where structure prevents drift.

The next two sections are going to address these issues. The section on context window management explains the core constraint directly, while the later section on GSD shows one concrete example of a structured workflow designed to handle it in practice.

---

# VI. Context Window Management

## The Tradeoff: Sufficiency vs Bloat

The model needs **enough context to act correctly**, but not so much that signal gets buried.

Two failure directions:

- **Context insufficiency**
  - missing information, files, constraints, or decisions
  - leads to incorrect assumptions and wrong execution
- **Context bloat**
  - too much irrelevant or low-priority information
  - leads to weaker reasoning, distraction, and higher cost

This is not linear. More context does not mean better performance. At some point, adding information **reduces accuracy instead of improving it**.

## What The Model Actually Has Access To

At any step, the model operates across three surfaces:

1. **current context window**
2. **what it can fetch via tools**
3. **what has been externalized into artifacts**

It does *not* have:

- stable memory across steps
- implicit awareness of the full repo
- guaranteed continuity from earlier reasoning

If something is not in one of those three surfaces, it effectively does not exist.

## The Real Failure Modes

In practice, most agent failures reduce to context issues:

- **omission** -> key information never included
- **bloat** -> too much noise in the window
- **drift** -> context becomes outdated over time
- **hidden state** -> important decisions exist but are not accessible

These are upstream of planning and execution. If context is wrong, everything downstream inherits that error.

## What "Context Window Management" Means

Context window management is the discipline of:

> **deciding what enters the window, what stays out, and when it is refreshed**

It has four levers:

- **selection** -> what is included
- **compression** -> how it is summarized
- **structure** -> how it is organized
- **refresh** -> when it is reloaded or revalidated

## The Two Context Layers

A useful way to think about it:

### 1. Active Context (in-window)

What the model sees right now:

- current task
- active plan
- exact files or snippets needed

Constraint: **must stay tight and relevant**

### 2. Durable Context (externalized)

Durable context persists outside the window and can be retrieved when needed:
- file reads
- code search
- docs lookup
- plans
- summaries
- state files
- specs

Purpose: **depth without bloat**

## Design Implications

A few non-negotiable rules emerge:

- **Do not rely on memory**
  - if it matters, store it and reload it
- **keep the active window minimal**
  - optimize for the *next action*, not full awareness
- **externalize early**
  - plans, decisions, and results should live in artifacts
- **re-ground before acting**
  - re-check files and assumptions instead of trusting prior context
- **treat context as infrastructure**
  - this is a data pipeline and state system, not just prompting

## Practical Patterns

**Plan -> Execute -> Summarize -> Reload**

- create a plan artifact
- execute against it
- summarize what changed
- reload the summary into context

This maintains continuity without bloat.

**Narrow Before Acting**

- fetch only the exact files needed
- avoid broad or full-repo reads

This prevents context pollution.

**Evidence Before Decision**

- re-fetch current state before deciding
- do not rely on earlier context blindly

This reduces drift and hidden errors.

---

# VII. Spec-Driven Engineering

Spec-driven engineering is the layer that turns agent capability into bounded work.

The sequence is:

1. frame the task
2. research the actual system
3. design the workflow
4. express the result as a spec

The point is not documentation for its own sake. The point is to make execution constrained, reviewable, and recoverable.

## Framing

Framing defines the task.

It determines:

* what is being changed
* what is out of scope
* what constraints are fixed
* what outcome is expected

Without framing, the agent has too many degrees of freedom. It will fill missing structure with its own interpretation of the request.

## Research

After the task is framed, the agent needs an accurate picture of the current system.

In a local tool-using environment, research means inspecting the actual workspace:

* reading source files
* checking configuration
* reviewing documentation
* running commands
* comparing assumptions against the live system
* talking with the developer

This step changes the working model of the task. It may show that:

* the relevant implementation surface is different than expected
* an assumed constraint is false
* an existing mechanism already covers part of the requirement
* the original approach is incompatible with the current system

Research exists to replace plausible assumptions with repository-specific evidence and the developer's instructions.

## Workflow Design

Once the task is framed and the system has been inspected, the next question is execution structure.

Workflow design determines:

* sequencing
* decomposition
* checkpoints
* verification points
* stop conditions
* handoff artifacts

Typical decisions include:

* whether the task should be done in one pass or split into units
* what should be verified before moving forward
* what artifacts should be created before implementation
* when progress should stop for review

This is how the work becomes inspectable and controllable instead of improvised.

## Specs

The spec is the artifact that captures the output of framing, research, and workflow design in executable form.

A good spec defines:

* `scope`
* `constraints`
* `assumptions`
* `artifacts`
* `implementation expectations`
* `verification`

That gives the agent a bounded contract for execution.

A spec is useful because it makes missing structure visible.

If `scope` is unclear, the task expands.
If `assumptions` are implicit, execution rests on unverified beliefs.
If `artifacts` are undefined, outputs become vague.
If `verification` is weak, completion is subjective.

Specs reduce ambiguity, limit scope expansion, and provide a reference for execution, review, and recovery.

---

# VIII. GSD As A Workflow Framework

GSD (Get Shit Done) is a workflow framework layered on top of the kind of local-agent environment and workflow-design layer described above.

While Claude Code or Codex CLI provide the environment, GSD provides the workflow structure on top of that environment. Or in other words, GSD organizes how work moves through the harness.

## What GSD Adds

GSD adds explicit workflow structure:

- planning artifacts
- state tracking
- requirement mapping
- execution workflows
- validation workflows
- continuity workflows

Instead of relying on orchestrator memory, it turns workflow state into visible artifacts and reusable commands.

## The Core GSD Lifecycle

GSD does not have a single universal lifecycle, but some common patterns do exist. The workflow normally differs depending on whether the project is greenfield or brownfield:
- **greenfield**: a project starting from scratch
- **brownfield**: an existing project on which some work has already been done

Typical greenfield lifecycle:

1. `gsd-new-project`: initialize the project definition and core planning artifacts
2. `gsd-new-milestone`: start the first milestone and route into requirements and roadmap work
3. `gsd-discuss-phase`: narrow the phase boundary
4. `gsd-research-phase`: gather implementation evidence when needed
5. `gsd-plan-phase`: turn scope into execution artifacts
6. `gsd-execute-phase`: carry out the phase
7. `gsd-add-tests`: close testing gaps
8. `gsd-verify-work`: check user-facing behavior
9. `gsd-validate-phase`: audit structural completeness
10. `gsd-complete-milestone`: archive the shipped milestone and prepare for the next one

Brownfield work usually enters the flow differently. Instead of starting with `gsd-new-project`, you normally start with `gsd-map-codebase` so the existing repository, constraints, and local conventions are made explicit before phase planning begins. After that, the flow returns to the same phase-oriented loop: discuss, research, plan, execute, verify, validate, and preserve state when needed.

## Why GSD Matters

GSD turns workflow control into explicit structure, which:
- improves quality by making plans, verification, checkpoints, and assumptions visible
- improves efficiency by reducing rework, limiting drift, and making it clear what the next bounded action is
- makes long-running work resumable, because state, artifacts, and progress are preserved instead of reconstructed from memory

It answers questions like:

- what phase are we in?
- what has already been decided?
- what plan is active?
- what has been verified?
- what is the next command?

## GSD Internals

Repository: `https://github.com/gsd-build/get-shit-done`

At a high level, GSD is easiest to understand as a layered system:

- `skills/`
  Each GSD capability is installed as a skill, with one `SKILL.md` file per skill. A skill is the user-facing entrypoint: it defines what the capability does, how inputs are interpreted, and which workflow should be used.
- `get-shit-done/workflows/`
  Each skill is usually paired with a corresponding workflow Markdown file. The mapping is close to `1:1`, though not perfectly exact. Workflows contain the orchestration logic: what context to gather, what steps to follow, when to branch, and what artifacts to produce.
- `get-shit-done/bin/`, `scripts/`, `hooks/`
  Workflows can call tools, which are the executable layer behind the prompts. In practice, this means GSD is not just static Markdown: it can trigger real operations through supporting JavaScript and Node tooling, shell helpers, and runtime hooks.
- `agents/`
  Workflows can also spawn subagents. These are specialized role definitions, each describing a focused responsibility such as planning, execution, verification, or codebase mapping. They let work be delegated instead of keeping everything inside one context window.
- `get-shit-done/references/`
  References are reusable guidance documents. They provide shared heuristics, conventions, and rulebooks that workflows and agents can load when they need stable reasoning context.
- `get-shit-done/templates/`
  Templates are reusable output scaffolds. They define the expected structure of planning, verification, summary, and other generated artifacts so GSD can produce them consistently.

When the GSD repository is installed globally, these files are placed into the configuration directory of the terminal-native harness being used, such as Claude Code or Codex CLI.

A good shorthand is:

- skills are the entrypoints
- workflows are the orchestration layer
- tools are the executable layer
- agents are the delegation layer
- references provide shared reasoning context
- templates provide shared output structure

So, roughly speaking, GSD is a collection of skills, each usually associated with a workflow. Those workflows can invoke tools, use references and templates, and delegate work to subagents.

## GSD Skill Reference

### Project Setup And Configuration

- `gsd-new-project`: Initialize a new project with deep context gathering and `PROJECT.md`.
- `gsd-new-milestone`: Start a new milestone cycle, update `PROJECT.md`, and route to requirements.
- `gsd-settings`: Configure GSD workflow toggles and model profile.
- `gsd-set-profile`: Switch model profile for GSD agents.
- `gsd-help`: Show available GSD commands and usage guide.
- `gsd-update`: Update GSD to the latest version with changelog display.
- `gsd-health`: Diagnose planning-directory health and optionally repair issues.

### Discovery And Planning

- `gsd-progress`: Check project progress, show context, and route to the next action.
- `gsd-map-codebase`: Analyze a codebase with parallel mapper agents to produce `.planning/codebase/` documents.
- `gsd-discuss-phase`: Gather phase context through adaptive questioning before planning.
- `gsd-list-phase-assumptions`: Surface assumptions about a phase approach before planning.
- `gsd-research-phase`: Research how to implement a phase as a standalone discovery step.
- `gsd-plan-phase`: Create a detailed phase plan with a verification loop.
- `gsd-ui-phase`: Generate a UI design contract in `UI-SPEC.md` for frontend phases.
- `gsd-plan-milestone-gaps`: Create phases that close gaps found in milestone auditing.

### Execution And Debugging

- `gsd-execute-phase`: Execute all plans in a phase with wave-based parallelization.
- `gsd-quick`: Execute a quick task with GSD guarantees while skipping optional agents.
- `gsd-debug`: Run a systematic debugging flow with persistent state across context resets.
- `gsd-autonomous`: Run all remaining phases autonomously through discuss, plan, and execute.
- `gsd-add-tests`: Generate tests for a completed phase from UAT criteria and implementation.
- `gsd-reapply-patches`: Reapply local modifications after a GSD update.

### Validation And Review

- `gsd-verify-work`: Validate built features through conversational UAT.
- `gsd-validate-phase`: Retroactively audit and fill Nyquist validation gaps for a completed phase.
- `gsd-ui-review`: Run a retroactive six-pillar visual audit of implemented frontend code.
- `gsd-audit-milestone`: Audit milestone completion against original intent before archiving.

### Roadmap And Milestone Maintenance

- `gsd-add-phase`: Add a phase to the end of the current milestone in the roadmap.
- `gsd-insert-phase`: Insert urgent work as a decimal phase between existing phases.
- `gsd-remove-phase`: Remove a future phase from the roadmap and renumber later phases.
- `gsd-complete-milestone`: Archive a completed milestone and prepare for the next version.
- `gsd-cleanup`: Archive accumulated phase directories from completed milestones.

### Continuity And Utilities

- `gsd-pause-work`: Create a context handoff when pausing work mid-phase.
- `gsd-resume-work`: Resume work from a previous session with full context restoration.
- `gsd-add-todo`: Capture an idea or task as a todo from the current conversation context.
- `gsd-check-todos`: List pending todos and select one to work on.
- `gsd-stats`: Display project statistics across phases, plans, requirements, git metrics, and timeline.
- `gsd-join-discord`: Join the GSD Discord community.

## Alternatives

Other similar frameworks to GSD do exist, such as Speckit (https://github.com/github/spec-kit) and Superpowers (https://github.com/obra/superpowers).

Superpowers has a strong TDD (Test-Driven Development) orientation, and users often describe it as robust and well suited to large projects. GSD is designed for speed and takes a more practical, less opinionated approach. Reviews of Speckit seem to be mixed.

---

# Further Study

Read:
- Claude Code docs: https://code.claude.com/docs/en/overview
- Codex CLI docs: https://developers.openai.com/codex
- Codex CLI repo (Codex CLI is open source): https://github.com/openai/codex

Watch:
- Dave Ebbelaar on: Five levels of AI agent complexity, from augmented LLMs and DAG workflows to tool-calling agents, agent harnesses, and multi-agent orchestration: https://youtu.be/BaXTos7B1vY
- Simon Scrapes on: Seven levels of Claude Code mastery, guiding you from basic prompting all the way to building fully autonomous systems: https://youtu.be/Y09u_S3w2c8
- Sean Grove on: Spec-Driven Engineering: https://youtu.be/8rABwKRsec4
