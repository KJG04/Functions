import { useRef } from "react";
import * as S from "./styles";

interface PropsType {
  text: string;
  onClick?: () => void;
}

const StickyNav = ({ text, onClick }: PropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !textRef.current) {
      return;
    }

    const container = containerRef.current;
    const text = textRef.current;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const { offsetWidth: width, offsetHeight: height } = container;

    const move = 25;
    const xMove = (x / width) * (move * 2) - move;
    const yMove = (y / height) * (move * 2) - move;

    text.style.transform = `translate(${xMove}px, ${yMove}px)`;
  };

  const onMouseLeave = () => {
    if (!textRef.current) {
      return;
    }
    const text = textRef.current;

    text.style.transform = `translate(0px, 0px)`;
  };

  return (
    <S.Container
      ref={containerRef}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <S.Text ref={textRef}>{text}</S.Text>
    </S.Container>
  );
};

export default StickyNav;
