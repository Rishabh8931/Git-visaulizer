import { Line } from "react-konva";
import { useEffect, useState, useMemo } from "react";

function AnimatedLine({ points, stroke, strokeWidth, opacity }) {
  const [progress, setProgress] = useState(0);

  const [x1, y1, x2, y2] = points;

  // Calculate a smooth S-curve path
  const curvePoints = useMemo(() => {
    // If it's a straight vertical line (same lane)
    if (x1 === x2) {
      return [x1, y1, x2, y2];
    }

    // For branch/merge (different lanes), create a vertical start/end with a curve in between
    const midY = y1 + (y2 - y1) * 0.5;
    
    return [
      x1, y1,       // Start
      x1, midY,     // Vertical segment start
      x2, midY,     // Horizontal transition end
      x2, y2        // End
    ];
  }, [x1, y1, x2, y2]);

  // Approximate path length for dash animation
  const pathLength = useMemo(() => {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return dx + dy; // Simple approximation for Manhattan-ish curve
  }, [x1, y1, x2, y2]);

  useEffect(() => {
    let frame;
    let start = 0;

    const animate = () => {
      start += 0.03; // Smooth drawing speed
      if (start >= 1) start = 1;

      setProgress(start);

      if (start < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [points]);

  return (
    <Line
      points={curvePoints}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity || 1}
      lineCap="round"
      lineJoin="round"
      tension={0.4} // Adds the radius to the bends
      dash={[pathLength, pathLength]}
      dashOffset={pathLength * (1 - progress)}
    />
  );
}

export default AnimatedLine;
