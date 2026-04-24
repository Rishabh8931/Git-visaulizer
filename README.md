# 🚀 Git Visualizer

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![Styled Components](https://img.shields.io/badge/Styles-Styled--Components-db7093?logo=styled-components)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Project-Active-success)

---

## 🌟 Overview

**Git Visualizer** is a high-performance, interactive learning tool designed to help developers master Git's internal workings. Through a real-time command-line interface and a dynamic, animated commit graph, it bridges the gap between typing commands and understanding state changes.

### What's New?
- **Modern Glassmorphism UI**: A sleek, professional dashboard with resizable panes.
- **Dynamic Themes**: Toggle between "Obsidian Night" and "Frosty Day" modes.
- **Expanded Git Engine**: Support for `status`, `log`, `reset`, `checkout -b`, and more.
- **Intelligent Terminal**: Inline ghost suggestions and Tab auto-completion.
- **Smooth Graphing**: Curved branch lines and unique branch coloring.

---

## 🎯 Features

- **🖥️ Pro Terminal**: manual command input with history (↑/↓), inline suggestions, and Tab completion.
- **🌿 Advanced Branching**: Smooth visualization of parallel lanes with unique branch colors.
- **🔵 Curved Commit Graph**: S-curve paths between branch nodes with polished drawing animations.
- **✨ UX Enhancements**: Resizable panes (drag-to-resize), click-to-copy commit hashes, and persistent layout.
- **📦 Workspace Management**: Real-time tracking of Working Directory, Staging Area, and Remote Repository.
- **🌍 Remote Simulation**: `git push`, `git fetch`, and remote tracking visualization.
- **💾 State Persistence**: Automatically saves your entire Git state and UI preferences to `localStorage`.

---

## 🛠️ Tech Stack

- **⚛️ React 19**: Modern component architecture.
- **🎨 Styled Components**: Dynamic, theme-aware CSS-in-JS.
- **🖌️ React-Konva**: Canvas-based rendering for the high-performance commit graph.
- **⚡ Vite**: Ultra-fast build and development environment.

---

## ⚙️ Installation

```bash
git clone https://github.com/Rishabh8931/Git-visaulizer.git
cd git-visualizer
npm install
npm run dev
```

---

## 🚀 Usage

### Common Commands & Shorthands
| Command | Shorthand | Description |
| :--- | :--- | :--- |
| `git status` | `gst` | Check staging area |
| `git add <file>` | `ga <file>` | Stage changes |
| `git commit -m "msg"`| `gcm "msg"` | Create a new commit |
| `git log` | `gl` | View commit history |
| `git checkout -b <br>`| - | Create and switch branch |
| `git reset --hard` | - | Reset state to previous commit |

---

## 🧩 Project Structure
```text
src/
 ├── components/
 │   ├── Terminal/           # Intelligent CLI
 │   ├── CommitGraph/        # Canvas visualization
 │   ├── WorkingDirectory/   # Local state tracking
 │   └── RemoteRepository/   # Pushed commits & hashes
 ├── state/
 │   ├── gitReducer.js       # Core Git logic
 │   └── initialState.js     # Default state & schema
 ├── utils/
 │   ├── commandParser.js    # Shorthand & Command mapping
 │   └── localStorage.js     # Persistence layer
 └── App.jsx                 # Theme & Layout provider
```

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements
Inspired by tools like **GitKraken**, **GitHub Desktop**, and the need for better Git mental models.
