# 🌿 Commit Graph

A visual representation of Git commit history built using **React + React-Konva**.
This graph helps users understand **branches, commit relationships, and HEAD position** in an interactive way.

---

# 🎨 Visual Elements

The graph converts Git data into visual elements:

| Element         | Representation            |
| --------------- | ------------------------- |
| 🔵 Circle       | Git Commit                |
| ➖ Line          | Parent relationship       |
| 🎨 Colors       | Different branches        |
| 🏷 Label        | Commit ID                 |
| 📍 HEAD pointer | Current checkout position |

Each commit is drawn as a **node**, and parent relationships are drawn as **edges**.

---

# 🧩 Components Used

The graph is built using **React-Konva canvas components**.

### Core Canvas Structure

```
Stage
 └── Layer
      ├── AnimatedLine
      └── AnimatedNode
```

### Components

#### Stage

Canvas container.

```
<Stage />
```

Handles:

* zoom
* pan
* drag navigation
* viewport transformations

---

#### Layer

Drawing layer for performance optimization.

```
<Layer />
```

Benefits:

* independent redraw
* grouped rendering
* improved canvas performance

---

#### AnimatedNode

Custom component representing **commits**.

```
<AnimatedNode />
```

Internally uses:

```
Circle
Text
Group
```

Responsibilities:

* draw commit node
* apply animation
* highlight HEAD commit

---

#### AnimatedLine

Custom component representing **commit connections**.

```
<AnimatedLine />
```

Internally uses:

```
Line
```

Responsibilities:

* connect commits
* animate parent relationships

---

# ⚙️ Graph Layout Logic

The graph layout is computed dynamically.

### Commit Order (Y-axis)

Commits are placed vertically based on order.

```
y = index * 80
```

This ensures consistent spacing between commits.

---

### Branch Separation (X-axis)

Each branch receives its own horizontal column.

```
x = 100 + branchIndex * 120
```

This prevents branch overlap.

Example layout:

```
main        feature
  |             |
  C1
  |
  C2 ----------- C3
  |
  C4
```

---

### Parent Relationship

Each commit stores its parent ID.

Lines are drawn using:

```
points = [x1, y1, x2, y2]
```

Example:

```
Child Commit
     |
     |
Parent Commit
```

---

# ✨ Animations

Animations improve readability and UX.

### Commit Pop-in Animation

Each node appears with a **scale animation**.

Example:

```
scale: 0 → 1
duration: 0.3s
```

Effect:

```
commit appears smoothly instead of popping instantly
```

---

### Line Drawing Animation

Commit edges animate progressively when rendered.

This visually shows **commit history flow**.

---

### HEAD Highlight

The current commit is highlighted using:

```
stroke: orange
strokeWidth: 4
```

Additionally a pointer shows:

```
HEAD → commit
```

---

# 🧠 Navigation Features

The graph supports **interactive navigation**.

### Zoom

Mouse wheel zoom implemented using stage scaling.

```
stage.scale()
```

Zoom focuses on **cursor position** rather than center.

---

### Pan (Drag Navigation)

Users can drag the canvas.

```
<Stage draggable />
```

Allows exploring large commit histories.

---

### Reset View

Resets zoom and position.

```
scale = 1
x = 0
y = 0
```

Useful when the graph moves outside the viewport.

---

# ⚡ Performance Optimizations

Several optimizations ensure smooth rendering.

### Safe Data Handling

Fallbacks prevent crashes:

```
Object.values(commits || {})
```

---

### Branch Position Mapping

Branch coordinates are computed once:

```
branchX[branch] = 100 + index * 120
```

Reduces repeated calculations.

---

### Layer Rendering

Using **Konva layers** prevents unnecessary full canvas redraws.

---

### Batch Rendering

Canvas updates use:

```
stage.batchDraw()
```

This groups multiple updates into a **single frame render**, improving performance.

---

### Conditional Rendering

Invalid commits are skipped:

```
if (!commit || !commit.id) return null
```

Prevents rendering errors.

---

# 🎯 Purpose

This commit graph helps users:

* visualize Git history
* understand branching
* see commit relationships
* track HEAD position

The goal is to provide an **intuitive graphical understanding of Git structure**.

---

# 🚀 Future Improvements

Possible enhancements:

* branch color system
* commit hover details
* graph auto-centering
* minimap navigation
* merge commit visualization
* large repository virtualization

---

# 🛠 Built With

* **React**
* **React-Konva**
* **Konva Canvas Engine**
