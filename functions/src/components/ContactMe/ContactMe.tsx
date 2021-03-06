import { useEffect, useRef } from "react";
import * as S from "./styles";
import { color } from "../../style/color";
import StickyNav from "../StickyNav/StickyNav";
import gsap, { Power4 } from "gsap";

interface Point {
  x: number;
  y: number;
}

const ContactMe = () => {
  const EMAIL = "freedom7113@gmail.com";

  const leftDarkRef = useRef<HTMLDivElement>(null);
  const rightDarkRef = useRef<HTMLDivElement>(null);
  const darkContainerRef = useRef<HTMLDivElement>(null);

  const copy = (string: string) => {
    var textarea = document.createElement("textarea");
    textarea.value = string;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const onEmailClick = () => {
    copy(EMAIL);
    alert("복사 완료!");
  };

  const openLight = () => {
    //빛이 펼쳐지는 효과
    const leftDark = leftDarkRef.current;
    const rightDark = rightDarkRef.current;

    if (!leftDark || !rightDark) {
      return;
    }

    gsap.to(leftDark, { duration: 2, rotation: 30, ease: Power4.easeInOut });
    gsap.to(rightDark, {
      duration: 2,
      rotation: -30,
      ease: Power4.easeInOut,
      onComplete: () => {
        window.addEventListener("mousemove", followLight);
      },
    });
  };

  const followLight = (e: MouseEvent) => {
    const darkContainer = darkContainerRef.current;
    if (!darkContainer) {
      return;
    }

    const origin: Point = { x: window.screen.width / 2, y: 0 };
    const mouse: Point = { x: e.screenX, y: e.screenY };

    const temp: Point = { x: -origin.x + mouse.x, y: -origin.y + mouse.y };

    const deg = (Math.atan2(temp.y, temp.x) * 180) / Math.PI - 90;

    darkContainer.style.transform = `rotate(${deg * 0.2}deg)`;
  };

  useEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.darkGray;
    openLight();

    return () => {
      window.removeEventListener("mousemove", followLight);
    };
  }, []);

  return (
    <>
      <S.Container>
        <S.CenterContainer>
          <S.ContentContainer>
            <S.Subtitle>email</S.Subtitle>
            <StickyNav>
              <S.Title onClick={onEmailClick}>{EMAIL}</S.Title>
            </StickyNav>
          </S.ContentContainer>
          <S.ContentContainer>
            <S.Subtitle>github</S.Subtitle>
            <StickyNav>
              <S.TitleLink href="https://github.com/KJG04" target="_blank" rel="noreferrer">
                https://github.com/KJG04
              </S.TitleLink>
            </StickyNav>
          </S.ContentContainer>
        </S.CenterContainer>
        <S.DarkContainer ref={darkContainerRef}>
          <S.Dark1 ref={leftDarkRef} />
          <S.Dark2 ref={rightDarkRef} />
        </S.DarkContainer>
      </S.Container>
    </>
  );
};

export default ContactMe;
