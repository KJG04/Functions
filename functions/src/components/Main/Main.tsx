import * as S from "./styles";
import gsap, { Power4 } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { color } from "../Minesweeper";
import CustomCursor from "./CustomCursor/CustomCursor";
import { useNavigate } from "react-router-dom";

const Main = (): JSX.Element => {
  const navigate = useNavigate();
  interface Nav {
    text: string;
    onClick: () => void;
    color: string;
  }

  const [canScale, setCanScale] = useState<boolean>(true);

  const setCursorBig = () => {
    setScale(420);
    setCanScale(false);
  };

  const activeNav = () => {
    navs.map((value, i) => {
      const width = value.clientWidth;

      gsap.to(value, {
        duration: 2.5,
        x: width + 48,
        ease: Power4.easeOut,
        delay: 0.6 - i * 0.1,
        opacity: 0,
      });
    });
  };

  const onMinesweeper = () => {
    setCursorBig();
    activeNav();
    setTimeout(() => {
      navigate("/minesweeper");
    }, 3000);
  };

  const navArray: Nav[] = [
    { text: "Minesweeper", onClick: onMinesweeper, color: color.green },
    {
      text: "Logic Gate",
      onClick: () => {
        setCursorBig();
      },
      color: color.red,
    },
    {
      text: "Path finder",
      onClick: () => {
        setCursorBig();
      },
      color: color.orange,
    },
    {
      text: "Heap tree",
      onClick: () => {
        setCursorBig();
      },
      color: color.yellow,
    },
    {
      text: "Dice",
      onClick: () => {
        setCursorBig();
      },
      color: color.lightBlue,
    },
    {
      text: "Contact me",
      onClick: () => {
        setCursorBig();
      },
      color: color.darkGray,
    },
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
    if (canScale) {
      setCursorColor(color);
      setScale(50);
    }
  };

  const onNavLeave = () => {
    if (canScale) {
      setScale(1);
    }
  };

  const navRender = navArray.map((value, index) => {
    const { text, onClick, color } = value;

    return (
      <div
        ref={(el) => (navsRef.current[index] = el!)}
        onMouseEnter={() => onNavEnter(color)}
        onMouseLeave={onNavLeave}
      >
        <S.NoDecoLink onClick={onClick}>
          <S.Title canScale={canScale}>{text}</S.Title>
        </S.NoDecoLink>
      </div>
    );
  });

  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.backgroundColor;
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
