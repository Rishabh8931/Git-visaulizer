# ⚙️ Git Engine (Reducer)

The reducer is the core processing unit that implements Git's logic. It handles all state transformations based on dispatched actions.

---

## 🔹 Core Operations

### `INIT`
Sets `initialized: true`. Allows other commands to proceed.

### `ADD`
Moves a file from the `workingDirectory` to the `stagingArea`. Prevent duplicate staging entries for the same file.

### `COMMIT`
- Snapshots the current `stagingArea`.
- Creates a new commit object with a unique hash (timestamp).
- Links the new commit to its parent (previous HEAD).
- Advances the current branch pointer and the `HEAD` pointer.
- Clears the `stagingArea`.

### `CHECKOUT` & `CHECKOUT_NEW_BRANCH`
- `CHECKOUT`: Switches the `currentBranch` and moves `HEAD` to that branch's latest commit.
- `CHECKOUT_NEW_BRANCH`: Creates a new branch pointer at the current `HEAD` and switches to it.

### `MERGE`
- Creates a special "Merge Commit" with two parents (current HEAD and source branch HEAD).
- Combines files from both branches.
- Advances the current branch pointer to the new merge commit.

### `RESET` & `RESET_HARD`
- `RESET`: Moves the current branch pointer and `HEAD` to a specific commit.
- `RESET_HARD`: Same as reset, but also clears the `stagingArea` and reverts the `workingDirectory` to match the target commit's files.

---

## 🔹 Remote Operations

### `PUSH`
Copies all local commits and branch pointers to the `remote` state.

### `REMOTE_ADD`
Links a remote name and URL to the repository state.

### `FETCH`
Simulates a sync operation by updating the `lastFetched` timestamp and ensuring remote state is current.
