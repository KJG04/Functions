import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./styles";

interface PropsType {
  color: string;
  scale: number;
}

const CustomCursor = ({ color, scale }: PropsType): JSX.Element => {
  const cursor = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(1);

  const onMove = (e: MouseEvent) => {
    const { x, y } = e;

    if (cursor && cursor.current) {
      cursor.current.style.top = `${y}px`;
      cursor.current.style.left = `${x}px`;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", () => setOffset(0.5));
    window.addEventListener("mouseup", () => setOffset(1));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", () => setOffset(0.5));
      window.removeEventListener("mouseup", () => setOffset(1));
    };
  }, [scale]);

  return (
    <>
      <S.Container>
        <S.Inner>
          <S.Cursor color={color} scale={scale * offset} ref={cursor}/>
        </S.Inner>
      </S.Container>
    </>
  );
};

export default CustomCursor;
