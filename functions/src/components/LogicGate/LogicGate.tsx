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

  const distance = Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);

  return distance <= radius;
};

const LogicGate = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  const [startPoint, setStartPoint] = useState<Point>([0, 0]);
  const [endPoint, setEndPoint] = useState<Point>([0, 0]);

  const isMousePress = useRef(false);
  const dots = useRef<Point[]>([
    [300, 300],
    [500, 500],
  ]);
  const currentLine = useRef<Line | null>(null);

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isMousePress.current) {
      setEndPoint([e.clientX, e.clientY]);
    }
  };

  const onMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setStartPoint([e.clientX, e.clientY]);
    isMousePress.current = true;
  };

  const onMouseUp = () => {
    isMousePress.current = false;
  };

  const drawLine = useCallback((line: Line): string => {
    const [sx, sy] = line.start;
    const [ex, ey] = line.end;

    const offsetX = Math.abs(sx - ex) / 2;

    return `M${sx},${sy} C${sx + offsetX},${sy} ${ex - offsetX},${ey} ${ex}, ${ey}`;
  }, []);

  return (
    <>
      <S.Container>
        <S.PathContainer onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {currentLine.current && (
            <path d={drawLine(currentLine.current)} fill="none" stroke="#FFFFFF" stroke-width="3" />
          )}
        </S.PathContainer>

        {dots.current.map(([x, y]) => {
          return <S.Dot style={{ top: `${x}px`, left: `${y}px` }} />;
        })}
      </S.Container>
    </>
  );
};

export default LogicGate;
