import { Stage, Layer, Circle, Line, Text, Group } from "react-konva";
import AnimatedNode from "../animations/AnimatedNodes";
import AnimatedLine from "../animations/AnimatedLine";

import { useRef, useState } from "react";
import Reset from "../ResetButton/Reset";

function CommitGraph({ commits, branches, HEAD }) {
  // zoom-draggable navigation
  const stageRef = useRef(null);
  const [stageState, setStageState] = useState({
    scale: 1,
    x: 0,
    y: 0,
  })

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
    })
  }

  // reset view
  const resetView = () => {
    const stage = stageState.current;
    setStageState({
      scale: 1,
      x: 0,
      y: 0,
    });

    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    stage.batchDraw();
  };

  //  Safe fallback
  const commitList = Object.values(commits || {});

  //  Branch X positions
  const branchX = {};
  let branchIndex = 0;

  Object.keys(branches || {}).forEach((branch) => {
    branchX[branch] = 100 + branchIndex * 120;
    branchIndex++;
  });

  return (
    <>

     <div
      style={
        {
          display : "flex",
          justifyContent : "space-between"
        }
      }
     >
       <button 
       style={
        {
          cursor : "pointer"
        }
       }
      onClick={resetView}>Reset view</button>

      <Reset/>
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
            y: e.target.y()
          }))
        }}
      >

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
            const isHead = commit.id === HEAD;

            const x = branchX[commit.branch] || 200;
            const y = index * 80 + 50;

            return (
              <Group key={commit.id}>
                <AnimatedNode
                  key={commit.id}
                  x={x}
                  y={y}
                  color="blue"
                  stroke={isHead ? "orange" : "black"}
                  strokeWidth={isHead ? 4 : 1}
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

                {/*  HEAD POINTER */}
                {isHead && (
                  <>
                    {/* Arrow Line */}
                    <Text
                      x={x - 10}
                      y={y - 7}
                      text=">"
                      fontSize={14}
                      fill="red"
                      fontStyle="bold"

                    />
                    <Line
                      points={[x - 60, y, x - 15, y]}
                      stroke="red"
                      strokeWidth={2}
                    />

                    {/* HEAD Text */}
                    <Text
                      x={x - 100}
                      y={y - 7}
                      text="HEAD"
                      fontSize={14}
                      fill="red"
                      fontStyle="bold"

                    />
                  </>
                )}
              </Group>
            )

          })}
        </Layer>
      </Stage>
    </>
  );
}

export default CommitGraph;