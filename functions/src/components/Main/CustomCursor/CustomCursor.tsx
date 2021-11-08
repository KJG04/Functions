import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./styles";
import gsap, { Power4 } from "gsap";

interface PropsType {
  color: string;
  scale: number;
}
const CustomCursor = ({ color, scale }: PropsType): JSX.Element => {
  const cursor = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const { x, y } = e;
    if (cursor && cursor.current) {
      cursor.current.style.top = `${y}px`;
      cursor.current.style.left = `${x}px`;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", onMove);
  }, []);

  return (
    <S.Container>
      <S.Inner>
        <S.Cursor color={color} scale={scale} ref={cursor} />
      </S.Inner>
    </S.Container>
  );
};

export default CustomCursor;
