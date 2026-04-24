# 🖥️ Intelligent Terminal

The terminal serves as the primary interface for user interaction, designed to provide a "pro-developer" experience with modern CLI features.

---

## ✨ Advanced Features

- **Inline Ghost Suggestions**: Predicts the command you're typing based on common Git patterns.
- **Tab Auto-completion**: Press `Tab` to instantly complete the suggested ghost command.
- **Command History**: Navigate previous commands using `↑` and `↓` arrow keys.
- **Persistent Logs**: Terminal output history is saved to `localStorage`, so your progress isn't lost on refresh.
- **Formatted Logs**: Styled output for `git log` and `git status` for better readability.

---

## 🔧 Technical Details

### Command Handling
The terminal captures user input on `Enter`, passes it through the `commandParser`, and then dispatches the resulting action to the global state.

### 📋 Click-to-Copy
When viewing commit history via `git log`, the commit hashes are interactive. Clicking a hash will instantly copy the full unique ID to your clipboard.

### 🎨 Theming
The terminal dynamically adapts its colors based on the application theme:
- **Obsidian Night**: Classic green/cyan on black high-contrast look.
- **Frosty Day**: Dark navy on light gray professional look.

---

## 🎯 Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Enter` | Execute command |
| `Tab` | Complete ghost suggestion |
| `↑` | Previous command in history |
| `↓` | Next command in history |
| `Ctrl+L` | Clear terminal (standard `clear` command also works) |
