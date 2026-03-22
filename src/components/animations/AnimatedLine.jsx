import { Line } from "react-konva";
import { useEffect, useState } from "react";

function AnimatedLine({ points }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start = 0;

    const animate = () => {
      start += 0.05;
      if (start >= 1) start = 1;

      setProgress(start);

      if (start < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  const [x1, y1, x2, y2] = points;

  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  return (
    <Line
      points={[x1, y1, currentX, currentY]}
      stroke="gray"
      strokeWidth={2}
    />
  );
}

export default AnimatedLine;