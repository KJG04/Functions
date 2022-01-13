import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { color } from "../Minesweeper";
import { ANDGate } from "./Gates";
import * as S from "./styles";

type Point = [x: number, y: number];

interface Line {
  start: Point;
  end: Point;
}

const radius = 10;
const isCollision = (point: Point, dot: Point): boolean => {
  const [x1, y1] = point;
  const [x2, y2] = dot;

  console.log(`point : [${point.join(", ")}]`);
  console.log(`dot : [${dot.join(", ")}]`);

  const distance = Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);

  console.log(distance <= radius);

  return distance <= radius;
};

const LogicGate = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  const isMousePress = useRef(false);
  const dots = useRef<Point[]>([
    [300, 300],
    [500, 500],
    [600, 450],
    [800, 740],
  ]);

  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isMousePress.current && currentLine) {
        setCurrentLine({ ...currentLine, end: [e.nativeEvent.offsetX, e.nativeEvent.offsetY] });
      }
    },
    [currentLine]
  );

  const onMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const mouse: Point = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

    const collisionDot = dots.current.find((value) => isCollision(mouse, value));
    if (!collisionDot) {
      return;
    }

    setCurrentLine({ start: collisionDot, end: collisionDot });
    isMousePress.current = true;
  }, []);

  const onMouseUp = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!currentLine) {
        isMousePress.current = false;
        setCurrentLine(null);
        return;
      }

      const mouse: Point = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
      const collisionDot = dots.current.find((value) => isCollision(mouse, value));

      if (!collisionDot) {
        setCurrentLine(null);
        return;
      }

      setLines([...lines, { start: currentLine.start, end: collisionDot }]);

      setCurrentLine(null);
    },
    [currentLine, lines]
  );

  const drawLine = useCallback((line: Line): string => {
    const [sx, sy] = line.start;
    const [ex, ey] = line.end;

    const offsetX = Math.abs(sx - ex) / 2;

    return `M${sx},${sy} C${sx + offsetX},${sy} ${ex - offsetX},${ey} ${ex}, ${ey}`;
  }, []);

  return (
    <>
      <S.Container>
        {dots.current.map(([x, y], index) => {
          return <S.Dot key={index} style={{ top: `${y}px`, left: `${x}px` }} />;
        })}

        <S.PathContainer onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {currentLine && (
            <path d={drawLine(currentLine)} fill="none" stroke="#FFFFFF" stroke-width="3" />
          )}
          {lines.map((value) => (
            <path d={drawLine(value)} fill="none" stroke="#FFFFFF" stroke-width="3" />
          ))}
        </S.PathContainer>
      </S.Container>
    </>
  );
};

export default LogicGate;
