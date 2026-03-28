import { Stage, Layer, Text, Line, Group } from "react-konva";
import AnimatedNode from "../animations/AnimatedNodes";
import AnimatedLine from "../animations/AnimatedLine";

import { useRef, useState } from "react";
import Reset from "../ResetButton/Reset";

function CommitGraph({ commits, branches, HEAD }) {

  const stageRef = useRef(null);

  const [stageState, setStageState] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  // ===============================
  // ZOOM HANDLER
  // ===============================

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    const scaleBy = 1.1;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setStageState({
      scale: newScale,
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  // ===============================
  // RESET VIEW
  // ===============================

  const resetView = () => {
    const stage = stageRef.current;

    setStageState({
      scale: 1,
      x: 0,
      y: 0,
    });

    if (stage) {
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      stage.batchDraw();
    }
  };

  // ===============================
  // SAFE COMMIT LIST
  // ===============================

  const commitList = Object.values(commits || {}).sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  // ===============================
  // GIT GRAPH LANE ALGORITHM
  // ===============================


   const laneWidth = 120;
const baseX = 100;
const commitSpacing = 80;

const positions = {};
const branchLane = {};
const commitLane = {};

let nextLane = 0;

commitList.forEach((commit, index) => {

  let lane;

  // FIRST COMMIT
  if (!commit.parent) {
    lane = 0;
    branchLane[commit.branch] = lane;
  }

  // NEW BRANCH
  else if (!(commit.branch in branchLane)) {
    lane = ++nextLane;
    branchLane[commit.branch] = lane;
  }

  // EXISTING BRANCH
  else {
    lane = branchLane[commit.branch];
  }

  commitLane[commit.id] = lane;

  positions[commit.id] = {
    x: baseX + lane * laneWidth,
    y: index * commitSpacing + 50,
  };

});

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{ cursor: "pointer" }}
          onClick={resetView}
        >
          Reset view
        </button>

        <Reset />
      </div>

      <Stage
        ref={stageRef}
        width={600}
        height={600}
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

          {/* =============================
               DRAW CONNECTION LINES
          ============================== */}

          {commitList.map((commit) => {

            if (!commit.parent) return null;

            const from = positions[commit.id];
            const to = positions[commit.parent];

            if (!from || !to) return null;

            return (
              <AnimatedLine
                key={`line-${commit.id}`}
                points={[
                  from.x,
                  from.y,
                  to.x,
                  to.y,
                ]}
                stroke="gray"
                strokeWidth={2}
              />
            );
          })}

          {/* =============================
               DRAW COMMIT NODES
          ============================== */}

          {commitList.map((commit, index) => {

            const pos = positions[commit.id];
            const isHead = commit.id === HEAD;

            if (!pos) return null;

            return (
              <Group key={commit.id}>

                <AnimatedNode
                  x={pos.x}
                  y={pos.y}
                  color="blue"
                  stroke={isHead ? "orange" : "black"}
                  strokeWidth={isHead ? 4 : 1}
                />

                {/* Commit label */}
                <Text
                  x={pos.x - 6}
                  y={pos.y - 6}
                  text={`C${index + 1}`}
                  fontSize={10}
                  fill="white"
                />

                {/* Commit message */}
                <Text
                  x={pos.x + 30}
                  y={pos.y - 5}
                  text={commit.message || ""}
                  fontSize={15}
                  fontFamily="Poppins"
                />

                {/* HEAD POINTER */}
                {isHead && (
                  <>
                    <Text
                      x={pos.x - 10}
                      y={pos.y - 7}
                      text=">"
                      fontSize={14}
                      fill="red"
                      fontStyle="bold"
                    />

                    <Line
                      points={[pos.x - 60, pos.y, pos.x - 15, pos.y]}
                      stroke="red"
                      strokeWidth={2}
                    />

                    <Text
                      x={pos.x - 100}
                      y={pos.y - 7}
                      text="HEAD"
                      fontSize={14}
                      fill="red"
                      fontStyle="bold"
                    />
                  </>
                )}

              </Group>
            );
          })}

        </Layer>
      </Stage>
    </>
  );
}

export default CommitGraph;