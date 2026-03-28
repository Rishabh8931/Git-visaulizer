# Commit Graph Engine (`CommitGraph`)

The **CommitGraph** component is responsible for visualizing the Git commit history in the local and remote repositories.

It renders:

* **Commits → circles**
* **Parent relationships → lines**
* **Branches → colored lanes**
* **HEAD → highlighted commit**
* **Merge commits → multiple incoming lines**

The component uses **react-konva** to render the graph on a canvas.

---

# Why a Layout Algorithm Is Needed

If commits are rendered simply in a vertical list:

```
o
o
o
o
```

branches start overlapping and the graph becomes messy.

Example of a messy layout:

```
o
|\
| o
| |
o |
 \|
  o
```

To fix this, professional Git tools use a **lane-based layout algorithm**.

---

# Lane-Based Commit Layout Algorithm

Each **branch is assigned a horizontal lane** (x-position).

This keeps commits aligned and prevents lines from crossing randomly.

Example:

```
main lane        feature lane

o
|
o---------------------o
|                     |
o                     o
```

Each lane has a fixed horizontal offset.

```
laneWidth = 120px
```

So the X position becomes:

```
x = baseX + laneIndex * laneWidth
```

---

# Commit Position Calculation

Each commit requires two coordinates:

```
(x, y)
```

### Vertical Position

Commits appear in chronological order.

```
y = index * commitSpacing
```

Example:

```
commitSpacing = 80px
```

---

### Horizontal Position

Based on branch lane.

```
x = baseX + branchLane * laneWidth
```

Example values:

```
baseX = 100
laneWidth = 120
```

---

# Lane Assignment

We map every branch to a lane.

```
const branchLane = {};
```

Then assign lanes sequentially.

```
let laneIndex = 0;

Object.keys(branches).forEach(branch => {
  branchLane[branch] = laneIndex;
  laneIndex++;
});
```

Example mapping:

```
main → lane 0
feature → lane 1
bugfix → lane 2
```

---

# Calculating Commit Positions

We compute positions before rendering.

```
const positions = {};

commitList.forEach((commit, index) => {
  const lane = branchLane[commit.branch] ?? 0;

  positions[commit.id] = {
    x: baseX + lane * laneWidth,
    y: index * commitSpacing + 50
  };
});
```

---

# Drawing Commits

Each commit is drawn as a circle.

```
<Circle
  x={pos.x}
  y={pos.y}
  radius={12}
  fill={getBranchColor(commit.branch)}
/>
```

---

# Drawing Parent Lines

Each commit connects to its parent.

```
<Line
  points={[
    from.x,
    from.y,
    to.x,
    to.y
  ]}
  stroke={getBranchColor(commit.branch)}
/>
```

---

# Merge Commit Support

Real Git merges produce **two parents**.

Example structure:

```
{
 id: "c7",
 message: "merge feature",
 parents: ["c5","c6"],
 branch: "main"
}
```

Rendering multiple lines:

```
commit.parents.forEach(parentId => {
  drawLine(commit, parentId)
})
```

This produces:

```
o---o
 \ /
  o
```

---

# HEAD Pointer

The current commit (HEAD) is highlighted.

```
stroke={commit.id === HEAD ? "yellow" : "black"}
strokeWidth={commit.id === HEAD ? 4 : 1}
```

Example visual:

```
o
|
o   ← HEAD
```

---

# Branch Colors

Each branch gets a color for readability.

```
main → blue
feature → green
develop → purple
```

Example mapping:

```
const branchColors = {
  main: "#3498db",
  feature: "#2ecc71",
  develop: "#9b59b6"
}
```

Fallback color:

```
"#e67e22"
```

---

# Zoom & Pan Navigation

Users can explore large graphs using:

* **Mouse wheel → zoom**
* **Drag → pan**

The stage maintains a scale state.

```
scale
x
y
```

Zoom is centered on the mouse cursor.

---

# Performance Considerations

To maintain performance:

* Commits are preprocessed into `commitList`
* Positions are calculated once per render
* Konva canvas handles rendering efficiently

This allows thousands of commits to render smoothly.

---

# Graph Layout Summary

```
laneWidth = 120
commitSpacing = 80

x = baseX + lane * laneWidth
y = index * commitSpacing
```

This ensures:

* stable graph structure
* readable branches
* minimal line overlap

---

# Future Improvements

Planned upgrades for the commit graph engine:

### Animated Commit Creation

New commits appear with scale animation.

### Push Animation

Commits move from **local → remote graph** during `git push`.

### Branch Merge Visualization

Better curved lines for merges.

### Commit Hover Tooltip

Shows:

* commit id
* message
* changed files

### Graph Mini-map

Allows quick navigation of large histories.

---

# Related Files

```
components/
 ├─ CommitGraph/
 │   └─ CommitGraph.jsx
 │
 ├─ WorkingDirectory/
 │   └─ WorkingDirectory.jsx
 │
 └─ RemoteRepository/
     └─ RemoteRepository.jsx
```

---

# Summary

The **lane-based layout algorithm** ensures the Git history remains readable by assigning each branch a fixed horizontal lane and positioning commits based on branch and time.

This mimics the visualization used by tools such as:

* GitKraken
* GitLens
* GitHub Desktop
* SourceTree

It is essential for building a professional Git visualization tool.
