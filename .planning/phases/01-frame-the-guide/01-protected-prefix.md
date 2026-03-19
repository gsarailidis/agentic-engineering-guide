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
