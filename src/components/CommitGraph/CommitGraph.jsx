import { Stage, Layer, Text, Line, Group } from "react-konva";
import AnimatedNode from "../animations/AnimatedNodes";
import AnimatedLine from "../animations/AnimatedLine";
import styled, { useTheme } from "styled-components";
import { useRef, useState } from "react";
import Reset from "../ResetButton/Reset";

const Controls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  display: flex;
  gap: 0.5rem;
  background: ${(props) => props.theme.surface}cc;
  padding: 0.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(4px);
  border: 1px solid ${(props) => props.theme.border};
`;

const ControlButton = styled.button`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  padding: 0.3rem 0.7rem;
  border-radius: 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.border};
  }
`;

function CommitGraph({ commits, branches, HEAD }) {
  const theme = useTheme();
  const stageRef = useRef(null);

  // Map branch names to unique colors from the theme
  const branchNames = Object.keys(branches || {});
  const getBranchColor = (branchName) => {
    const index = branchNames.indexOf(branchName);
    const colors = theme.branchColors || [theme.primary];
    return colors[index % colors.length];
  };

  const [stageState, setStageState] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const scaleBy = 1.1;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setStageState({
      scale: newScale,
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  const resetView = () => {
    setStageState({
      scale: 1,
      x: 0,
      y: 0,
    });
  };

  const commitList = Object.values(commits || {}).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );
  
  const laneWidth = 100;
  const baseX = 80;
  const commitSpacing = 70;

  const positions = {};
  const commitLane = {};
  let nextLane = 0;

  commitList.forEach((commit, index) => {
    let lane;
    if (!commit.parent || commit.parent.length === 0) {
      lane = 0;
    } else if (commit.parent.length === 1) {
      const parentId = commit.parent[0];
      const parentLane = commitLane[parentId];
      const parentCommit = commits[parentId];
      if (parentCommit && parentCommit.branch !== commit.branch) {
        lane = ++nextLane;
      } else {
        lane = parentLane !== undefined ? parentLane : 0;
      }
    } else {
      const firstParent = commit.parent[0];
      lane = commitLane[firstParent] ?? 0;
    }

    commitLane[commit.id] = lane;
    positions[commit.id] = {
      x: baseX + lane * laneWidth,
      y: index * commitSpacing + 50,
    };
  });

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Controls>
        <ControlButton onClick={resetView}>Center View</ControlButton>
        <Reset />
      </Controls>

      <Stage
        ref={stageRef}
        width={500}
        height={500}
        draggable
        scaleX={stageState.scale}
        scaleY={stageState.scale}
        x={stageState.x}
        y={stageState.y}
        onWheel={handleWheel}
        onDragEnd={(e) => {
          setStageState((prev) => ({
            ...prev,
            x: e.target.x(),
            y: e.target.y(),
          }));
        }}
      >
        <Layer>
          {commitList.map((commit) => {
            if (!commit.parent || commit.parent.length === 0) return null;
            const from = positions[commit.id];
            const branchColor = getBranchColor(commit.branch);
            
            return commit.parent.map((parentId) => {
              const to = positions[parentId];
              if (!from || !to) return null;
              return (
                <AnimatedLine
                  key={`line-${commit.id}-${parentId}`}
                  points={[from.x, from.y, to.x, to.y]}
                  stroke={branchColor}
                  strokeWidth={2}
                  opacity={1}
                />
              );
            });
          })}

          {commitList.map((commit, index) => {
            const pos = positions[commit.id];
            const isHead = commit.id === HEAD;
            if (!pos) return null;
            const branchColor = getBranchColor(commit.branch);

            return (
              <Group key={commit.id}>
                <AnimatedNode
                  x={pos.x}
                  y={pos.y}
                  color={branchColor}
                  stroke={isHead ? theme.accent : theme.surface}
                  strokeWidth={isHead ? 3 : 1}
                />

                <Text
                  x={pos.x - 6}
                  y={pos.y - 4}
                  text={`C${index + 1}`}
                  fontSize={8}
                  fill="white"
                  fontStyle="bold"
                />

                <Text
                  x={pos.x + 25}
                  y={pos.y - 12}
                  text={commit.message || ""}
                  fontSize={12}
                  fontFamily="'Inter', sans-serif"
                  fill={theme.text}
                  fontStyle="500"
                />

                {isHead && (
                  <Group>
                    <Line
                      points={[pos.x - 40, pos.y, pos.x - 12, pos.y]}
                      stroke={theme.accent}
                      strokeWidth={2}
                    />
                    <Text
                      x={pos.x - 80}
                      y={pos.y - 6}
                      text="HEAD"
                      fontSize={11}
                      fill={theme.accent}
                      fontStyle="bold"
                      fontFamily="'Inter', sans-serif"
                    />
                  </Group>
                )}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default CommitGraph;
