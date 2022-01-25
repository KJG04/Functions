import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dot, GateContext, Point } from "../../context/GateContext";
import { color } from "../Minesweeper";
import { ANDGate } from "./Gates";
import * as S from "./styles";

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

interface CurrentNode {
  start: Dot;
  end: Point;
}

const LogicGate = () => {
  const { nodes, gates, addNode } = useContext(GateContext);

  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  const isMousePress = useRef(false);

  const dots = useMemo(() => {
    const dots: Dot[] = [];

    gates.forEach((value) => {
      if (value.output) {
        dots.push(value.output);
      }
    });

    return dots;
  }, [gates]);

  const [currentNode, setCurrentNode] = useState<CurrentNode | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isMousePress.current && currentNode) {
        setCurrentNode({ ...currentNode, end: [e.nativeEvent.offsetX, e.nativeEvent.offsetY] });
      }
    },
    [currentNode]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const mouse: Point = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

      const collisionDot = dots.find((value) => isCollision(mouse, value.position));
      if (!collisionDot) {
        return;
      }

      setCurrentNode({ start: collisionDot, end: collisionDot.position });
      isMousePress.current = true;
    },
    [dots]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!currentNode) {
        isMousePress.current = false;
        setCurrentNode(null);
        return;
      }

      const mouse: Point = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

      const collisionDot = dots.find((value) => isCollision(mouse, value.position));

      if (!collisionDot) {
        setCurrentNode(null);
        return;
      }

      addNode(currentNode.start.id, collisionDot.id);
      setCurrentNode(null);
    },
    [addNode, currentNode, dots]
  );

  const drawLine = useCallback((start: Point, end: Point): string => {
    const [sx, sy] = start;
    const [ex, ey] = end;

    const offsetX = Math.abs(sx - ex) / 2;

    return `M${sx},${sy} C${sx + offsetX},${sy} ${ex - offsetX},${ey} ${ex}, ${ey}`;
  }, []);

  return (
    <>
      <S.Container>
        {gates.map((value, index) => {
          return <ANDGate key={value.id} {...{ ...value, index }} />;
        })}

        <S.PathContainer onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          {currentNode && (
            <path
              d={drawLine(currentNode.start.position, currentNode.end)}
              fill="none"
              stroke="#FFFFFF"
              stroke-width="3"
            />
          )}
          {lines.map((value) => (
            <path
              d={drawLine(value.start, value.end)}
              fill="none"
              stroke="#FFFFFF"
              stroke-width="3"
            />
          ))}
        </S.PathContainer>
      </S.Container>
    </>
  );
};

export default LogicGate;
