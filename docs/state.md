# 📦 Global State Schema

The application uses a centralized `useReducer` to manage the complex Git state and UI preferences.

---

## 🛠️ State Structure

```javascript
{
  initialized: boolean,      // Has 'git init' been run?
  
  // Local Workspace
  workingDirectory: Array,   // Files in the current workspace
  stagingArea: Array,        // Files ready for commit
  
  // Commit History
  commits: Object,           // Keyed by Commit ID (hash)
  branches: Object,          // Keyed by branch name, value is HEAD commit ID
  currentBranch: String,     // Active branch name
  HEAD: String,              // ID of the current commit
  
  // Remote Synchronization
  remote: {
    name: String,            // Remote alias (e.g., 'origin')
    url: String,             // Remote repository URL
    commits: Object,         // Commits pushed to remote
    branches: Object,        // Remote tracking branches
    lastFetched: Number      // Timestamp of last fetch
  },
  
  // UI Preferences (Saved in localStorage)
  themeMode: String,         // 'light' or 'dark'
  paneWidths: Array          // Relative widths of resizable dashboard sections
}
```

---

## 💾 Persistence Layer

The state is automatically mirrored to `localStorage` on every change. This ensures that:
1. Your commit history is preserved across browser sessions.
2. Your UI layout (pane widths) stays consistent.
3. Your theme preference is remembered.

To start fresh, you can use the **"Reset All"** button in the dashboard, which clears all stored data and reloads the application.
