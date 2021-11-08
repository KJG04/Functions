import * as S from "./styles";
import gsap, { Power4 } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { color } from "../Minesweeper";

const Main = (): JSX.Element => {
  interface Nav {
    text: string;
    to: string;
    color: string;
  }

  const navArray: Nav[] = [
    { text: "Minesweeper", to: "/", color: color.green },
    { text: "Logic Gate", to: "/", color: color.green },
    { text: "Finding a way", to: "/", color: color.green },
    { text: "Heap tree", to: "/", color: color.green },
    { text: "Dice", to: "/", color: color.green },
    { text: "Contact me", to: "/", color: color.green },
  ];

  const navsRef = useRef<HTMLDivElement[]>(new Array<HTMLDivElement>(navArray.length));
  const { current: navs } = navsRef;

  const firstAnimation = () => {
    navs.map((value, index) => {
      const width = value.clientWidth;
      gsap.from(value, { duration: 2.5, x: width + 48, ease: Power4.easeOut, delay: index * 0.1 });
    });
  };

  const navRender = navArray.map((value, index) => {
    const { text, to, color } = value;

    return (
      <div ref={(el) => (navsRef.current[index] = el!)}>
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
    <S.Container>
      <S.TitleContainer>
        <S.TitleContainerInner>{navRender}</S.TitleContainerInner>
      </S.TitleContainer>
    </S.Container>
  );
};

export default Main;
