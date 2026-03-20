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

Recent agentic frameworks come in many forms. Among them are:
 - Agentic CLI (command line interface) tools (Claude Code, Codex CLI)
 - Agentic IDEs (Cursor, Windsurf)
 - Agentic IDE extensions (Github Copilot, Codex)
 
These tools essentially define agent harnesses. The CLIs specifically tend to give us more power and freedom on how to setup these harnesses.

Claude Code is currently one of the clearest real-world implementations of agentic engineering concepts.
As such, we will focus on it here.

Please note that while Claude Code is focused on software engineering tasks, the same ideas can be used for many other domains.

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

Once an agent is grounded in a real environment, its work tends to converge on the same loop: inspect, plan, act, check, iterate. This is not abstract AI theory. It is the practical rhythm of making changes in a repository without losing control.

Inspect means looking at the current state before making assumptions: reading files, searching for handlers, listing directories, checking config, or reviewing prior notes. Plan means turning that inspection into an explicit next-step sequence instead of improvising every move. Act means editing files, running commands, creating artifacts, or invoking other tools. Check means comparing the result against the actual system by running tests, reading errors, or validating the changed files. Iterate means using that feedback to tighten the plan and continue until the task is actually complete.

In real repo work, the loop might look like this: inspect the authentication flow, plan a rate-limiting change, act by editing middleware and tests, check by running the relevant suite, then iterate when the first pass exposes a missed edge case. The value is not that the loop exists. The value is that the environment gives each stage concrete feedback. Plans can be compared against files, actions can be checked against commands, and the next iteration is driven by system evidence rather than optimism.

## Artifacts As Control Surfaces

The environment becomes much more reliable once execution is shaped by durable artifacts. Plans, task files, summaries, state files, and checklists are not just logs left behind by the work. They are control surfaces that influence what happens next.

A plan constrains the action space by making intended steps explicit. A task file can scope one unit of work so execution does not drift across unrelated problems. A summary records what changed, what was verified, and what still needs attention, which makes handoff and recovery possible. A state file preserves position across sessions so the agent or operator knows what phase is active and which decisions are already locked. A checklist turns vague completion into visible criteria that can be checked instead of guessed.

These artifacts matter because local-agent work is long-running and interruptible. The system needs ways to preserve intent outside the model's short-term context window. When Claude Code writes a plan before editing or leaves a summary after execution, the artifact is doing real coordination work. When a Codex CLI workflow reads a state file before continuing, the same pattern appears again. The artifact is not incidental output. It is part of the control system that keeps execution legible, resumable, and bounded.

## Skills And Reusable Workflows

Tools expose raw capabilities. Skills package repeatable ways of using those capabilities inside the environment. A skill is not just "the agent knows how to do something." It is a reusable operating pattern with a defined objective, expected inputs, execution steps, and verification behavior. Workflows sit one level above that: they orchestrate multiple steps or multiple skills so the system does not have to improvise the whole path from scratch every time.

This matters because terminal-native agent work quickly becomes too large for pure on-the-fly reasoning. Reusable workflows reduce drift, make expected outputs explicit, and preserve successful execution patterns across tasks. Instead of rediscovering how to map a codebase, add a phase, or verify a change each time, the system can invoke a packaged routine that already knows which artifacts to read, which checks to run, and which outputs to produce.

Claude Code makes the pattern easy to see when it follows a structured repo task: inspect the codebase, write a plan, execute scoped changes, run verification, and record what happened. The important insight is not the product feature list. It is that the work becomes more reliable when those steps are treated as a reusable workflow rather than a fresh improvisation. Codex CLI shows the same general idea when operators layer repeatable scripts, prompts, or repo conventions on top of the base tool contract.

Once skills, artifacts, and execution checks become reusable, a higher-level workflow framework becomes the natural next layer. That later layer is not the subject here, but it depends on these primitives being explicit first.

## Delegation And Parallel Subagents

Delegation is not magic autonomy. It is the deliberate act of carving a larger objective into smaller scoped units of work and assigning those units bounded context, expected outputs, and a verification path. In a terminal-native environment, that usually means giving a subagent a narrow task, the specific files or artifacts it should read, the constraints it must respect, and the form of the result it should return.

Good delegation depends on artifact-backed decomposition. A parent agent can create a task file, pass along the current plan, point to the relevant state file, and require a summary on completion. Those artifacts keep the delegated work aligned with the main objective and make the result reviewable when control returns. Without them, sub-work becomes opaque and parallel execution turns into guesswork.

Parallel subagents matter because many repo tasks separate cleanly: one agent can inspect tests while another reviews implementation details, or one can draft a migration note while another verifies the changed commands. The gain does not come from spawning more reasoning at random. It comes from choosing explicit boundaries, keeping each subagent's context narrow, and using summaries and checklists to merge the work safely. Delegation, in other words, is an orchestration choice built on top of environment access, reusable workflows, and durable control surfaces.
