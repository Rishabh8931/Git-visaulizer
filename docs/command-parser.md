# 🧠 Command Parser

The Command Parser is the intelligence layer that translates user strings into executable Git actions.

---

## 🔍 Supported Commands & Aliases

The parser now supports a wide range of standard Git commands and common developer shorthands.

### Standard Commands
- `git init`: Initialize a new repository.
- `git status`: View working directory and staging area state.
- `git add <file>`: Stage a file for commit.
- `git commit -m "message"`: Create a new commit.
- `git branch <name>`: Create a new branch.
- `git checkout <branch>`: Switch to an existing branch.
- `git checkout -b <branch>`: Create and switch to a new branch.
- `git merge <branch>`: Merge a branch into the current one.
- `git push`: Push commits to the remote repository.
- `git log`: View a detailed commit history.
- `git reset --hard <hash>`: Reset state to a specific commit.
- `git remote add <name> <url>`: Link a remote repository.
- `git fetch`: Sync with the remote.

### ⚡ Shorthands (Aliases)
| Shorthand | Full Command |
| :--- | :--- |
| `gs` / `gst` | `git status` |
| `ga` | `git add` |
| `gcm` | `git commit -m` |
| `gl` | `git log` |
| `gco` | `git checkout` |
| `gb` | `git branch` |
| `gp` | `git push` |
| `gm` | `git merge` |

---

## ⚙️ Normalized Logic

1. **Shorthand Expansion**: Matches the first word against a lookup table.
2. **Parsing**: Splits input by spaces and extracts parameters (e.g., messages, branch names).
3. **Action Creation**: Returns a standardized action object for the reducer.

---

## 🎯 Example Transformation

**Input:**
```bash
gcm "fixed bug"
```

**Internal Transformation:**
1. Expand `gcm` → `git commit -m "fixed bug"`
2. Extract message → `"fixed bug"`
3. Return: `{ type: "COMMIT", payload: "fixed bug" }`
