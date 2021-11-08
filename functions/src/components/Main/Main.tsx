import * as S from "./styles";
import gsap, { Power4 } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { color } from "../Minesweeper";
import CustomCursor from "./CustomCursor/CustomCursor";

const Main = (): JSX.Element => {
  document.querySelector("html")!.style.backgroundColor = color.backgroundColor;

  interface Nav {
    text: string;
    to: string;
    color: string;
  }

  const navArray: Nav[] = [
    { text: "Minesweeper", to: "/minesweeper", color: color.green },
    { text: "Logic Gate", to: "/", color: color.red },
    { text: "Finding a way", to: "/", color: color.orange },
    { text: "Heap tree", to: "/", color: color.yellow },
    { text: "Dice", to: "/", color: color.lightBlue },
    { text: "Contact me", to: "/", color: color.darkGray },
  ];

  const navsRef = useRef<HTMLDivElement[]>(new Array<HTMLDivElement>(navArray.length));
  const [cursorColor, setCursorColor] = useState<string>(color.black);
  const [scale, setScale] = useState<number>(1);
  const { current: navs } = navsRef;

  const firstAnimation = () => {
    navs.map((value, index) => {
      const width = value.clientWidth;
      gsap.from(value, { duration: 2.5, x: width + 48, ease: Power4.easeOut, delay: index * 0.1 });
    });
  };

  const onNavEnter = (color: string) => {
    setCursorColor(color);
    setScale(50);
  };
  const onNavLeave = () => {
    // setCursorColor(color.black);
    setScale(1);
  };

  const navRender = navArray.map((value, index) => {
    const { text, to, color } = value;

    return (
      <div
        ref={(el) => (navsRef.current[index] = el!)}
        onMouseEnter={() => onNavEnter(color)}
        onMouseLeave={onNavLeave}
      >
        <S.NoDecoLink to={to}>
          <S.Title>{text}</S.Title>
        </S.NoDecoLink>
      </div>
    );
  });

  useLayoutEffect(() => {
    firstAnimation();
  }, []);

  return (
    <>
      <CustomCursor color={cursorColor} scale={scale} />
      <S.Container>
        <S.TitleContainer>
          <S.TitleContainerInner>{navRender}</S.TitleContainerInner>
        </S.TitleContainer>
      </S.Container>
    </>
  );
};

export default Main;
