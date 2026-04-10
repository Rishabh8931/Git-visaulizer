# Project Directory Structure

This file describes the current directory structure for the `git-visualizer` project.

```
git-visualizer/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── docs/
│   ├── command-parser.md
│   ├── commit-graph.md
│   ├── contributing.md
│   ├── reducer.md
│   ├── remote-directory.md
│   ├── state.md
│   ├── terminal.md
│   └── working-directory.md
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── animations/
│   │   │   ├── AnimatedLine.jsx
│   │   │   └── AnimatedNodes.jsx
│   │   ├── CommitGraph/
│   │   │   └── CommitGraph.jsx
│   │   ├── RemoteRepository/
│   │   │   └── RemoteRepository.jsx
│   │   ├── ResetButton/
│   │   │   └── Reset.jsx
│   │   ├── Terminal/
│   │   │   └── Terminal.jsx
│   │   └── WorkingDirectory/
│   │       └── WorkingDirectory.jsx
│   ├── state/
│   │   ├── gitReducer.js
│   │   └── initialState.js
│   └── utils/
│       ├── commandParser.js
│       └── localStorage.js
```
