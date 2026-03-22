import { Circle } from "react-konva";
import { useEffect, useState } from "react";

function AnimatedNode({ x, y, color }) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setScale(2), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Circle
      x={x}
      y={y}
      radius={12}
      fill={color}
      scaleX={scale}
      scaleY={scale}
      draggable = {false}
    />
  );
}

export default AnimatedNode;