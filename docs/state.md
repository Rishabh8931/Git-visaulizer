

```md
# ⚙️ Git Reducer

Handles all Git operations.

---

## 🔹 INIT

Initializes repository.

---

## 🔹 ADD

Stages a file.

- Moves file from workingDirectory → stagingArea
- Prevents duplicates

---

## 🔹 COMMIT

Creates a new commit.

- Generates unique ID
- Stores parent (previous commit)
- Moves HEAD forward
- Clears staging area

---

## 🔹 BRANCH

Creates new branch pointer.

---

## 🔹 CHECKOUT

Switches branch.

- Updates currentBranch
- Moves HEAD
- Updates workingDirectory

---

## 🔹 PUSH

Copies local commits to remote.

---

## 🎯 Key Idea

Reducer acts like Git engine.