import gsap, { Power4 } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

interface PropsType {
  text: string;
  style?: React.CSSProperties;
}

interface TextType {
  now: string;
  prev: string;
}

const AwesomeTextTransiton = ({ text, style }: PropsType) => {
  const [texts, setTexts] = useState<TextType>({ now: "", prev: "" });
  const { now, prev } = texts;
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTexts((oldData) => ({ now: text, prev: oldData.now }));

    if (container.current && content.current) {
      container.current.style.height = `${content.current.offsetHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    gsap.fromTo(
      ".prevs",
      { yPercent: 0 },
      { duration: 1, ease: Power4.easeOut, stagger: 0.05, yPercent: -100 }
    );
    gsap.fromTo(
      ".nows",
      { yPercent: 0 },
      { duration: 1, ease: Power4.easeOut, stagger: 0.05, yPercent: -100 }
    );
  }, [texts]);

  return (
    <S.Container ref={container}>
      <S.TextContainer style={style}>
        {prev.split("").map((value) => (
          <div className="prevs">{value}</div>
        ))}
      </S.TextContainer>
      <S.TextContainer style={style} ref={content}>
        {now.split("").map((value) => (
          <div className="nows">{value}</div>
        ))}
      </S.TextContainer>
    </S.Container>
  );
};

export default AwesomeTextTransiton;
