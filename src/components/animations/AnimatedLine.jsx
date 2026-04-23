import { Line } from "react-konva";
import { useEffect, useState } from "react";

function AnimatedLine({ points, stroke, strokeWidth, opacity }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start = 0;

    const animate = () => {
      start += 0.04; // Smoother animation
      if (start >= 1) start = 1;

      setProgress(start);

      if (start < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [points]);

  const [x1, y1, x2, y2] = points;

  // We animate the second point towards the target
  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  return (
    <Line
      points={[x1, y1, currentX, currentY]}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity || 0.8}
      lineCap="round"
      lineJoin="round"
      tension={0.3} // This adds the radius/curve to the line
      bezier={false}
    />
  );
}

export default AnimatedLine;