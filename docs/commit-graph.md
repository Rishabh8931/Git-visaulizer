# 🔵 Commit Graph Engine

The **CommitGraph** component is responsible for the high-performance visualization of the Git commit history using `react-konva`.

---

## ✨ Visual Features

- **Curved Connection Edges**: Branch and merge lines use smooth S-curve paths (Bézier-style) for a modern, fluid aesthetic.
- **Dynamic Branch Coloring**: Each branch is automatically assigned a unique color from the theme palette, making it easy to track parallel development lanes.
- **Node Interactivity**:
  - **Hover Effects**: Nodes scale up slightly when hovered for better focus.
  - **Click to Copy**: (Available in Remote view) Click commit hashes to copy them.
- **HEAD Pointer**: A clear visual indicator showing where your repository currently points.

---

## 🔍 Graph Navigation

- **Zoom**: Use your mouse wheel to zoom in and out of the graph.
- **Pan/Drag**: Click and drag the canvas background to move through your commit history.
- **Center View**: Use the "Center View" button in the graph controls to reset your view position.

---

## ⚙️ Layout Algorithm

The graph uses a custom **Lane-based Algorithm**:
1. **Lanes**: Each branch is assigned a horizontal lane (X-coordinate).
2. **Spacing**: Commits are spaced vertically based on their creation order (Y-coordinate).
3. **Paths**: Connecting lines are drawn from parent commits to child commits, calculating intermediate points to create the signature curved edges.

---

## 🎨 Theme Integration

The graph dynamically pulls colors from the global `ThemeProvider`:
- `graphNode`: The primary node color.
- `graphLine`: High-contrast line colors.
- `branchColors`: An array of vibrant colors used for distinct branches.
- `accent`: Used for the HEAD pointer and highlighting.
