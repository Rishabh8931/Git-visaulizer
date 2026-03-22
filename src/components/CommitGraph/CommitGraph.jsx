import { Stage, Layer, Circle, Line, Text,Group } from "react-konva";
import AnimatedNode from "../animations/AnimatedNodes";
import AnimatedLine from "../animations/AnimatedLine";

function CommitGraph({ commits, branches }) {
  // ✅ Safe fallback
  const commitList = Object.values(commits || {});

  // 🧠 Branch X positions
  const branchX = {};
  let branchIndex = 0;

  Object.keys(branches || {}).forEach((branch) => {
    branchX[branch] = 100 + branchIndex * 120;
    branchIndex++;
  });

  return (
    
    <Stage width={500} height={600}>
      <Layer>

        {/*  DRAW LINES (parent connections) */}

        {commitList.map((commit, index) => {
          if (!commit || !commit.parent) return null;

          const parentIndex = commitList.findIndex(
            (c) => c.id === commit.parent
          );

          if (parentIndex === -1) return null;

          const fromX = branchX[commit.branch] || 200;
          const toX =
            branchX[commits[commit.parent]?.branch] || 200;

          return (
            <AnimatedLine
              key={`line-${commit.id}`}
              points={[
                fromX,
                index * 80 + 50,
                toX,
                parentIndex * 80 + 50,
              ]}
              stroke="gray"
              strokeWidth={2}
            />
          );
        })}

        {/*  DRAW COMMITS (circles) */}
        {commitList.map((commit, index) => {
          if (!commit || !commit.id) return null;

          const x = branchX[commit.branch] || 200;
          const y = index * 80 + 50;

          return (
            <Group key={commit.id}>
              <AnimatedNode
                key={commit.id}
                x={x}
                y={y}
                color="blue"
              />

              {/* Commit label (C1, C2) */}
              <Text
                x={x - 6}
                y={y - 6}
                text={`C${index + 1}`}
                fontSize={10}
                fill="white"
              />

              {/* Commit message */}
              <Text
                x={x + 30}
                y={y - 5}
                text={`${commit.message}`}
                fontSize={15}
                fontFamily="Poppins"
              />
            </Group>
          );
        })}

      </Layer>
    </Stage>
  );
}

export default CommitGraph;