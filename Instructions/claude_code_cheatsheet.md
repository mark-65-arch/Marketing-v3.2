# Claude Code Cheat Sheet

## 📦 Launching / CLI

- **claude**  
  Opens the interactive REPL so you can chat and code step-by-step.

- **claude -p "query"**  
  Runs a single query and prints the result without opening a session.

- **claude -c**  
  Continues your most recent conversation, keeping its context.

- **claude -r "<session-id>" "query"**  
  Resumes a specific session by ID, useful if you juggle multiple projects.

---

## ⚙️ Common Flags

- **--model <name>**  
  Pick which Claude model to use (e.g. Claude 3.5 Sonnet).

- **--output-format <fmt>**  
  Control how results are printed (JSON, raw text, streaming).

- **--add-dir <path>**  
  Allow Claude access to a specific project directory.

- **--verbose**  
  Shows detailed logs of Claude’s reasoning and actions.

- **--permission-mode <mode>**  
  Start in auto, plan, or normal mode for different safety levels.

- **--dangerously-skip-permissions**  
  Lets Claude act without confirmation (use only if you trust the task).

---

## 🔧 REPL Shortcuts

- **Ctrl+C**  
  Interrupts a running generation or cancels input.

- **Ctrl+D**  
  Exits the REPL session cleanly (EOF).

- **Ctrl+L**  
  Clears the terminal window, keeps history intact.

- **Up / Down arrows**  
  Browse and reuse previous prompts in history.

- **Esc Esc**  
  Quickly jump back to edit your last message.

- **Shift+Tab**  
  Toggles between Normal, Plan, and Auto-Accept permission modes.

- **\ + Enter**  
  Inserts a line break inside your prompt for multi-line input.

---

## 🚀 Slash Commands

- **/init**  
  Creates a CLAUDE.md file to store context, memory, and project notes.

- **/clear**  
  Wipes the current conversation context and starts fresh.

- **/compact**  
  Summarizes and trims history to save tokens and reduce clutter.

- **/review**  
  Asks Claude to review code, PRs, or specific files you reference.

- **/terminal-setup**  
  Configures keybindings (like Shift+Enter for line breaks).

- **Custom commands**  
  Add `.md` files inside `.claude/commands` to define your own shortcuts.

---

## 🧠 Best Practices

- **Maintain CLAUDE.md**  
  Keeps style guides, conventions, or notes that Claude will always read.

- **Use Plan Mode**  
  Slows Claude down to plan before acting, improves reliability.

- **Check verbose logs**  
  See what context Claude is using and how it reasons.

- **Inject shell output with !**  
  Example: `!git status` shares live command results with Claude.

- **Reset often**  
  Start fresh with /clear when switching tasks to avoid confusion.

- **Parallel sessions**  
  Run separate REPLs per project or domain to keep focus clean.

- **Use IDE integration**  
  Connect Claude directly in VS Code or other supported editors.
