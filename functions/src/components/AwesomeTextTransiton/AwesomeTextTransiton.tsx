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

  return (
    <S.Container ref={container}>
      <div style={style}>
        {prev.split("").map((value) => (
          <span className="prevs">{value}</span>
        ))}
      </div>
      <div style={style} ref={content}>
        {now.split("").map((value) => (
          <span className="prevs">{value}</span>
        ))}
      </div>
    </S.Container>
  );
};

export default AwesomeTextTransiton;
