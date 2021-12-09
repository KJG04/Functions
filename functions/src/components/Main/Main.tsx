import * as S from "./styles";
import gsap, { Power4 } from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { color } from "../Minesweeper";
import CustomCursor from "./CustomCursor/CustomCursor";
import { useNavigate } from "react-router-dom";
import Back from "./Back/Back";
import BoxType from "../../interface/BoxType";

const Main = (): JSX.Element => {
  const navigate = useNavigate();
  interface Nav {
    text: string;
    onClick: () => void;
    color: string;
  }

  const [canScale, setCanScale] = useState<boolean>(true);
  const [cursorColor, setCursorColor] = useState<string>(color.black);
  const [scale, setScale] = useState<number>(1);
  const [boxArray, setBoxArray] = useState<BoxType[]>([]);

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
    setTimeout(() => {
      navigate("/minesweeper");
    }, 3000);
  };

  const onLoginGate = () => {};
  const onPathFinder = () => {};
  const onHeapTree = () => {};
  const onDice = () => {};
  const onContactMe = () => {};

  const navArray: Nav[] = [
    { text: "Minesweeper", onClick: onMinesweeper, color: color.green },
    {
      text: "Logic Gate",
      onClick: () => {
        onLoginGate();
      },
      color: color.red,
    },
    {
      text: "Path finder",
      onClick: () => {
        onPathFinder();
      },
      color: color.orange,
    },
    {
      text: "Heap tree",
      onClick: () => {
        onHeapTree();
      },
      color: color.yellow,
    },
    {
      text: "Dice",
      onClick: () => {
        onDice();
      },
      color: color.lightBlue,
    },
    {
      text: "Contact me",
      onClick: () => {
        onContactMe();
      },
      color: color.darkGray,
    },
  ];

  const navsRef = useRef<HTMLDivElement[]>(new Array<HTMLDivElement>(navArray.length));
  const { current: navs } = navsRef;

  const firstAnimation = () => {
    navs.map((value, index) => {
      const width = value.clientWidth;
      gsap.from(value, { duration: 2.5, x: width + 48, ease: Power4.easeOut, delay: index * 0.1 });
    });
  };

  const onNavLeave = () => {
    if (canScale) {
      setScale(1);
    }
  };

  const onNavEnter = useCallback(
    (color: string) => {
      if (canScale) {
        setCursorColor(color);
        setScale(50);

        const box: BoxType = {
          color: color,
          key: new Date().getMilliseconds(),
        };

        setBoxArray(boxArray.concat(box));
      }
    },
    [boxArray]
  );

  const onNavClick = (callback: () => void) => {
    setCursorBig();
    activeNav();
    callback();
  };

  const navRender = navArray.map((value, index) => {
    const { text, onClick, color } = value;

    return (
      <div
        ref={(el) => (navsRef.current[index] = el!)}
        onMouseEnter={() => onNavEnter(color)}
        onMouseLeave={onNavLeave}
      >
        <S.NoDecoLink onClick={() => onNavClick(onClick)}>
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
      <Back boxArray={boxArray} />
    </>
  );
};

export default Main;
