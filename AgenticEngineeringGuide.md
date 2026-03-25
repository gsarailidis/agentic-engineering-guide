## Contents

- [Introduction](#introduction)
- [I. Agentic AI (the behavior)](#i-agentic-ai-the-behavior)
- [II. Agentic Engineering (the discipline)](#ii-agentic-engineering-the-discipline)
  - [1. Control of the loop](#1-control-of-the-loop)
  - [2. Reliability](#2-reliability)
  - [3. Observability](#3-observability)
  - [4. Evaluation](#4-evaluation)
  - [5. Cost control](#5-cost-control)
  - [6. Architecture](#6-architecture)
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
- [V.5 Context Window Management](#v5-context-window-management)
  - [The Tradeoff: Sufficiency vs Bloat](#the-tradeoff-sufficiency-vs-bloat)
  - [What the Model Actually Has Access To](#what-the-model-actually-has-access-to)
  - [The Real Failure Modes](#the-real-failure-modes)
  - [What “Context Window Management” Means](#what-context-window-management-means)
  - [The Three Context Layers](#the-three-context-layers)
  - [Design Implications](#design-implications)
  - [Practical Patterns](#practical-patterns)
  - [Relationship to the Next Section](#relationship-to-the-next-section)
- [VI. Spec-Driven Engineering](#vi-spec-driven-engineering)
  - [Framing Decides What Work Exists](#framing-decides-what-work-exists)
  - [Research Changes What The Agent Should Believe](#research-changes-what-the-agent-should-believe)
  - [Workflow Design Determines How Work Moves](#workflow-design-determines-how-work-moves)
  - [Specs Are The Execution Contract](#specs-are-the-execution-contract)
- [VII. GSD As A Workflow Framework](#vii-gsd-as-a-workflow-framework)
  - [What GSD Adds](#what-gsd-adds)
  - [The Core GSD Lifecycle](#the-core-gsd-lifecycle)
  - [Why GSD Matters](#why-gsd-matters)
  - [Full GSD Skill Reference](#full-gsd-skill-reference)
    - [Project Setup And Configuration](#project-setup-and-configuration)
    - [Discovery And Planning](#discovery-and-planning)
    - [Execution And Debugging](#execution-and-debugging)
    - [Validation And Review](#validation-and-review)
    - [Roadmap And Milestone Maintenance](#roadmap-and-milestone-maintenance)
    - [Continuity And Utilities](#continuity-and-utilities)

---

# Introduction

This guide is about agentic engineering in local, tool-using environments.

More specifically, it is about development-time terminal-native agent work: systems where a model is not only generating text, but is operating inside a real workspace with files, commands, tools, permissions, and durable artifacts.

That is not the same thing as a production-system agent embedded in a shipped product or backend service. However, those systems have related concerns. Understanding the local development environment also helps clarify how production agents with similar capabilities are designed.

What the guide covers:

- the minimal concepts needed to talk clearly about agentic behavior and agentic engineering
- the vocabulary that the guide uses
- the structure of terminal-native agent environments
- Claude Code as a detailed concrete harness example
- spec-driven engineering; the workflow-design layer that sits above the harness
- GSD as a workflow framework built on top of that kind of environment

How the guide is paced:

- the introduction sets the subject, scope, and reading path
- sections `I-III` are minimal prerequisites, not a full survey
- the framework section explains the environment-level operating patterns in moderate depth
- the Claude Code section is intentionally more detailed and concrete
- the workflow-design section explains how framing, research, workflow design, and specs turn capable local agents into bounded engineering work
- the GSD section explains structure, lifecycle, and skill surface

The goal is to give a clear mental model of the environment, the working patterns it makes possible, and the layers that sit on top of it.

---

# I. Agentic AI (the behavior)

Agentic AI refers to **AI systems that act toward goals through multi-step reasoning and tool use**.

This section stays narrow on purpose. It defines the minimal behavioral pattern that the rest of the guide will engineer around.

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

In this guide, that discipline matters because the system is not acting in the abstract. It is operating through explicit loops, tools, permissions, and checks in a real workspace.

It therefore deals with:

## 1. Control of the loop

- planning structure
- stopping conditions
- retry logic
- tool routing
- guardrails

## 2. Reliability

- hallucinated tool calls
- runaway loops
- brittle plans
- context explosion
- tool misuse

## 3. Observability

- traces
- tool decisions
- intermediate outputs
- failures

## 4. Evaluation

- step correctness
- task completion
- cost vs performance
- trajectory quality

## 5. Cost control

- model routing
- caching
- pruning
- bounded depth

## 6. Architecture

- memory
- tools
- planners
- evaluators
- policies
- orchestration

Without explicit engineering, the system degrades into improvisation: unclear loops, weak boundaries, and unreliable outcomes.

These concerns are the bridge into the rest of the guide. The following sections define the terms, then show how those concerns become visible in an actual local-agent environment.

---

# III. Definitions

## Agent

An **agent** is a system that:

1. receives a goal
2. decides actions
3. executes them through tools
4. observes results
5. repeats until completion

What makes this an agent rather than a one-shot tool call is the loop.

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
- LangGraph loops
- OpenAI agent frameworks
- custom orchestrators

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

This guide is about **local tool-using agent environments**.

The important shift is not "the model can call a tool." The important shift is that the model operates inside a real workspace it can inspect and change.

Claude Code and Codex CLI are useful examples because they make this contract visible. This section stays at the environment layer. The next section shows what the same pattern looks like inside one concrete harness.

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

This is still the pattern layer. The point is not that every harness looks identical. The point is that local-agent work repeatedly converges on this kind of inspect-plan-act-check loop when the environment is designed well.

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

The main design question at the environment layer is not "which model?" It is "what operating system surrounds the model?"

A strong agent environment gives the model:

- a real workspace
- explicit loops
- durable artifacts
- reusable workflows
- scoped delegation
- visible verification

When these are weak, the system becomes opaque. When they are explicit, the system becomes controllable.

That is the setup for the next section. `# V` is not another pass over the same abstractions. It is what those abstractions look like inside one concrete terminal-native harness.

---

# V. Claude Code

Section `IV` described the general environment pattern. Claude Code is a useful next step because it shows that pattern inside one concrete harness with explicit tools, permissions, artifacts, and workflow.

## Why Claude Code Is A Good Reference Example

Claude Code makes five important things visible:

1. the model works inside a real working directory
2. the model can inspect and modify files
3. the model can run shell commands
4. the model is constrained by permissions and approval rules
5. the model can create durable artifacts that survive the current turn

That combination is what makes the harness useful as a reference example. The value of Claude Code here is not brand recognition. It is that the environment contract is exposed clearly enough to inspect.

## The Basic Execution Model

At a high level, Claude Code behaves like this:

1. receive a user goal
2. inspect the local workspace
3. form or update a plan
4. execute bounded actions through tools
5. check the result against the real system
6. continue until the task is complete or blocked

This is much closer to supervised systems work than to plain chat. The pattern is familiar from `# IV`; what matters here is seeing how one real harness exposes it to the operator.

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

This is where the harness perspective becomes concrete. The rhythm is not just advice about how an agent should behave. It is the practical cadence the environment makes possible.

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

Claude Code does not remove failure. It changes the form of failure.

Common problems:

- acting on incomplete inspection
- editing too broadly
- trusting a plan that should be revised
- hiding failed checks behind confident language
- delegating overlapping work
- losing control of scope

This is why the surrounding engineering matters so much: more capability means the failure modes become more consequential, not less.

---

# V.5 Context Window Management

Before specs, there is a more basic constraint:

**the model only knows what is inside its context window.**

This creates a fundamental tension:

- **too little context -> the model guesses**
- **too much context -> the model degrades**

This is the core of context window management.

You are not just supplying information. You are **controlling the model's working set**.

## The Tradeoff: Sufficiency vs Bloat

The model needs **enough context to act correctly**, but not so much that signal gets buried.

Two failure directions:

- **Context insufficiency**
  - missing files, constraints, or decisions
  - leads to incorrect assumptions and wrong execution
- **Context bloat**
  - too much irrelevant or low-priority information
  - leads to weaker reasoning, distraction, and higher cost

This is not linear. More context does not mean better performance.

At some point, adding information **reduces accuracy instead of improving it**.

## What The Model Actually Has Access To

At any step, the model operates on:

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

This is not prompt formatting. It is **state control**.

## The Three Context Layers

A useful way to think about it:

### 1. Active Context (in-window)

What the model sees right now:

- current task
- active plan
- exact files or snippets needed

Constraint: **must stay tight and relevant**

### 2. Retrieved Context (on-demand)

What the model can pull when needed:

- file reads
- code search
- docs lookup

Purpose: **depth without bloat**

### 3. Durable Context (externalized)

What persists outside the window:

- plans
- summaries
- state files
- specs

Purpose: **continuity without overload**

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

## Relationship to the Next Section

Context window management answers:

> **"what does the agent actually know right now?"**

Spec-driven engineering answers:

> **"what should the agent do with that knowledge?"**

If context is wrong, specs fail.

If context is controlled, specs become enforceable.

---

# VI. Spec-Driven Engineering

Sections `IV` and `V` establish the environment and then one concrete harness. The next layer is the workflow-design question: how those capabilities get turned into bounded engineering work that can actually be trusted.

## Framing Decides What Work Exists

The first failure mode is not bad execution. It is solving the wrong problem.

A loose request gives the agent too many possible interpretations, so it fills the gap with its own guess about what matters. That guess may still produce activity, edits, and even passing checks, but it can miss the real target completely.

Problem framing decides what work exists by deciding:

- what the task is really trying to change
- what constraints are fixed
- where the boundaries are

A strong frame names:

- the outcome
- the protected surfaces
- the reason the work matters

It turns "do something in this area" into "change this specific thing for this reason without spilling into adjacent work."

That is why framing is not just prompt polish. It is the first scope control. If the frame is vague, every later step inherits that vagueness.

## Research Changes What The Agent Should Believe

Once the work is framed, the next question is whether the current understanding is actually true.

Local agents can:

- inspect the codebase
- read docs
- check configs
- run commands
- compare claims against the live environment

That means research is not optional background reading. It is the mechanism that replaces assumption with evidence.

Research changes what the agent should believe about the task. It may reveal:

- that the important file is somewhere else
- that an existing constraint makes the original approach invalid
- that a supposed gap is already covered

A short contrast makes the point:

- "improve onboarding" is still mostly guesswork
- "reduce first-run setup confusion after checking the current setup path, error messages, and docs" gives the work a factual base

Good research narrows uncertainty before execution starts. It tells the system what is real in this repository, this environment, and this documentation set instead of what sounded plausible at the start.

## Workflow Design Determines How Work Moves

Framing identifies the target. Research corrects the picture. Workflow design decides how the work should move from there.

This is the layer that chooses:

- sequencing
- decomposition
- checkpoints
- feedback loops

Typical workflow-design questions:

- should the task be handled in one pass or split into smaller units?
- what artifacts need to be created before execution begins?
- where should verification happen?
- what should stop progress and force a review?

Those are workflow-design questions, and they matter because capable agents can move quickly in the wrong direction if the motion itself is poorly structured.

Workflow design is therefore the bridge between understanding and execution.

It converts a researched problem into an approach that is:

- paced
- inspectable
- recoverable

instead of improvisational.

In practice, this is where a vague "just do it" request becomes explicit units of work, checkpoints, and review surfaces.

## Specs Are The Execution Contract

A spec is the execution contract.

The earlier steps matter because they produce the material that the contract must capture.

- Framing defines the real target.
- Research defines what is actually true.
- Workflow design defines how the work should proceed.
- The spec turns those decisions into the explicit artifact that governs execution.

That contract should make the work legible before implementation begins. It names:

- what is in `scope`
- which `assumptions` are being made
- which `artifacts` should exist when the work is done
- what evidence counts
- what `verification` will decide whether the result is acceptable

It also makes absence visible.

- If scope is missing, the task can expand without limit.
- If assumptions are hidden, the plan can be built on fiction.
- If artifacts are unnamed, the work has no concrete outputs.
- If verification is weak, completion becomes a matter of vibe.

This is why specs matter so much in local-agent engineering.

The agent already knows how to:

- read
- edit
- run
- check

The harder problem is making sure those capabilities are aimed through an explicit contract instead of through a loose intention.

A good spec does not add bureaucracy. It:

- reduces ambiguity
- bounds autonomy
- creates a shared reference for execution, review, and recovery

Once those contracts, artifacts, and verification loops are made explicit, they can be packaged into a framework with reusable workflow structure. That is the handoff into `# VII`: GSD is one concrete example of that framework layer built on top of the local-agent environment described so far.

---

# VII. GSD As A Workflow Framework

GSD is a workflow framework layered on top of the kind of local-agent environment and workflow-design layer described above.

Repository: `https://github.com/gsd-build/get-shit-done`

Layer boundary:

- Claude Code or Codex CLI: provide the environment
- GSD: provides workflow structure on top of that environment

GSD does not replace the harness. It organizes how work moves through it.

## What GSD Adds

GSD adds explicit workflow structure:

- planning artifacts
- state tracking
- requirement mapping
- execution workflows
- validation workflows
- continuity workflows

Instead of relying on operator memory, it turns workflow state into visible artifacts and reusable commands.

## The Core GSD Lifecycle

GSD does not have one universal lifecycle. The workflow differs depending on whether the project is greenfield or brownfield.

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

Typical brownfield lifecycle:

1. `gsd-progress`: inspect current state
2. `gsd-map-codebase`: build shared repo context when needed
3. `gsd-discuss-phase`: narrow the phase boundary
4. `gsd-research-phase`: gather implementation evidence
5. `gsd-plan-phase`: turn scope into execution artifacts
6. `gsd-execute-phase`: carry out the phase
7. `gsd-add-tests`: close testing gaps
8. `gsd-verify-work`: check user-facing behavior
9. `gsd-validate-phase`: audit structural completeness
10. `gsd-pause-work` or `gsd-complete-milestone`: preserve or close state

The difference matters because brownfield work starts from an existing codebase and existing constraints, while greenfield work starts by creating the planning structure that later phases will rely on.

## Why GSD Matters

GSD matters because it turns workflow control into explicit structure.

That improves quality by making plans, verification, checkpoints, and assumptions visible. It improves efficiency by reducing rework, limiting drift, and making it clear what the next bounded action is. It also makes long-running work resumable, because state, artifacts, and progress are preserved instead of reconstructed from memory.

It answers questions like:

- what phase are we in?
- what has already been decided?
- what plan is active?
- what has been verified?
- what is the next command?

The skill reference below is not an appendix bolted onto the guide. It is the visible command surface of that workflow layer.

## Full GSD Skill Reference

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
