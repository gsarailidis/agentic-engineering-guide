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

## 1. What Claude Code actually is

Claude Code is an **agentic coding system developed by Anthropic**.

It is essentially:

**An AI agent that operates directly inside the developer’s working environment (terminal / IDE) and performs multi-step software engineering tasks.**

Unlike traditional coding assistants, **it behaves like an engineer executing tasks**, not just a code generator. It can:

* read an entire codebase
* plan changes
* modify files
* run commands
* run tests
* interact with git
* submit pull requests

All through **natural language instructions**.

---

## 2. What Claude Code actually does internally

Claude Code follows a **structured agent loop**.

Typical internal cycle:

```
User request
   ↓
Plan the task
   ↓
Explore codebase
   ↓
Call tools (search, edit, run tests)
   ↓
Evaluate results
   ↓
Iterate until task complete
```

Example workflow:

User request:

> “Add rate limiting to the login endpoint.”

Agent behavior:

1. Search the codebase for the login handler.
2. Identify the framework (FastAPI, Express, etc).
3. Plan the change.
4. Edit multiple files.
5. Update dependencies.
6. Run tests.
7. Commit changes.
8. Propose a pull request.

Claude Code can also **run CLI tools directly**, integrating with git, build tools, and deployment systems.

---

# 3. Why Claude Code is a good example of agentic engineering

Claude Code exposes the **engineering structures needed to make agents reliable**.

These structures include:

### 1. Controlled tool use

The agent does not hallucinate code edits.

It must use specific tools:

* file search
* file editing
* command execution
* git operations

This prevents arbitrary output generation.

---

### 2. Explicit planning

Claude Code often creates **structured plans before acting**.

Example:

```
Plan:
1. Locate authentication module
2. Add middleware
3. Update route
4. Add tests
5. Run test suite
```

This reduces failure rates.

---

### 3. Environment grounding

The agent works with the **real project environment**:

* file system
* dependencies
* terminal commands
* test suites

This grounds the reasoning loop.

---

### 4. Human approval layer

By default:

* file edits require approval
* commands require approval

This prevents destructive actions.

---

### 5. Iterative reasoning

Claude Code can run **long chains of reasoning and execution**, sometimes for minutes.

This is critical for complex tasks.

---

# 4. Architectural components of a modern agentic system

Systems like Claude Code rely on a **small number of architectural primitives**.

These are the key concepts you asked to define.

---

---

# 6. The real design pattern behind Claude Code

Claude Code follows a **simple but powerful architecture**:

```
User Goal
   ↓
Agent Harness
   ↓
LLM reasoning
   ↓
Tool use
   ↓
Environment feedback
   ↓
Iterate
```

The key idea:

The LLM **does not directly generate the final output**.

Instead it **controls actions in an environment**.

---

# 7. Why skills are becoming a major idea

Large agent systems struggle with:

* long reasoning chains
* unreliable planning
* high token cost

Skills solve this.

Instead of planning everything:

```
Agent calls skill:
"implement feature"
```

Skill internally executes:

```
search code
edit files
run tests
commit changes
```

This is **hierarchical agency**.

---

# 8. What Claude Code proves

Claude Code demonstrated something important:

**Agentic systems become powerful when the environment is simple and structured.**

Programming environments are ideal because:

* file system
* deterministic tools
* test feedback
* version control

This makes **software engineering one of the first domains where agentic AI works well.**
