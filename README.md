# 🚀 Git Visualizer

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Project-Active-success)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen)

---

## 🌟 Overview

**Git Visualizer** is an interactive learning tool that helps students understand how Git works internally through **real-time command execution and visual commit graphs**.

It simulates a real Git environment with:

- 🖥️ Terminal input
- 🌿 Branching visualization
- 🔁 Commit graph (circles & lines)
- 📦 Staging & working directory
- 🌍 Remote repository

---

## 🎬 Screenshots

### 🖥️ Main UI

![Main UI](./screenshots/main-ui.png)

### 🌿 Branching Visualization

![Branch Graph](./screenshots/branch-graph.png)

### 🎯 HEAD Pointer

![HEAD Pointer](./screenshots/head-pointer.png)

### 🌍 Remote Repository

![Remote](./screenshots/remote.png)

---

## 🎯 Features

- 🖥️ Real Git-like terminal (manual command input)
- 🌿 Branch creation & switching
- 🔵 Commit graph with nodes & connections
- ✨ Animations (commit pop, line draw)
- 🎯 HEAD pointer visualization
- 📦 Working directory & staging area
- 🌍 Remote repository simulation (`git push`)
- 💾 Persistent state using localStorage

---

## 🧠 What You’ll Learn

- How Git tracks changes internally
- Difference between working directory, staging, and commits
- How branching works
- How HEAD moves
- How local & remote repositories differ

---

## 🛠️ Tech Stack

- ⚛️ React (Vite)
- 🎨 react-konva (canvas rendering)
- 💾 localStorage (state persistence)

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/git-visualizer.git
cd git-visualizer
npm install
npm run dev

---
```
## 🚀 Usage
- Type commands in terminal:
- git init
- git add file1.txt
- git commit -m "first commit"

- git branch feature
- git checkout feature
- git commit -m "feature work"

- git push

```

## 🧩 Project Structure
src/
 ├── components/
 │   ├── Terminal/
 │   ├── CommitGraph/
 │   ├── WorkingDirectory/
 │   └── RemoteRepository/
 ├── reducers/
 ├── utils/
 └── App.jsx

docs/
 ├── state.md
 ├── reducer.md
 ├── terminal.md
 ├── commit-graph.md
  
  ---


  ```
## future implementations:-
   - 🔀 Merge commits (multiple parents)
   - 🔁 Rebase visualization
   - 🎬 Advanced animations
   - 🔍 Zoom & drag graph
   -  👥 Multiplayer / collaboration mode
  ---


  ```

## 🤝 Contributing

  Contributions are welcome!
- 1.Fork the repo
- 2.Create your branch
- 3.Commit changes
- 4.Open a PR

  See **CONTRIBUTING.md** for details.

   ---
   ``` 
  
## 📜 License

 This project is licensed under the MIT License.
     ---
    ```
## ⭐ Support

   If you found this useful:
  👉 Star the repo
  👉 Share with others

## 🙌 Acknowledgements
   Inspired by tools like:
   - GitKraken
   - GitHub Graph
   -  SourceTree
