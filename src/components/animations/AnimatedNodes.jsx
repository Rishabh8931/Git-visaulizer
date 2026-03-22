import { Circle } from "react-konva";
import { useEffect, useState } from "react";

function AnimatedNode({ x, y, color, stroke,strokeWidht }) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setScale(1), 500);
    return () => clearTimeout(timeout);
  }, []);



  return (
    <Circle
    onMouseEnter={(e) => {
  e.target.scale({ x: 1.3, y: 1.3 });
}}
onMouseLeave={(e) => {
  e.target.scale({ x: 1, y: 1 });
}}
      x={x}
      y={y}
      radius={12}
      fill={color}
      scaleX={scale}
      scaleY={scale}
      draggable = {false}
      stroke={stroke}
      strokeWidth={strokeWidht}
      
    />
  );
}

export default AnimatedNode;