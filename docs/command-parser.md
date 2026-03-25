# 🧠 Command Parser

Converts terminal input into actions.

---

## 🔍 Supported Commands

- git init
- git add <file>
- git commit -m "message"
- git branch <name>
- git checkout <branch>
- git push

---

## ⚙️ How It Works

1. Split input string
2. Identify command
3. Return action object

---

## 🎯 Example

Input:
```bash
git commit -m "first"

```bash
Output:
{ type: "COMMIT", payload: "first" }
