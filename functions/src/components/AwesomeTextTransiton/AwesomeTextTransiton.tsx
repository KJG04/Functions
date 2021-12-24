import { useEffect, useState } from "react";
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

  useEffect(() => {
    setTexts((oldData) => ({ now: text, prev: oldData.now }));
  }, [text]);

  return (
    <S.Container>
      <div style={style}>{now}</div>
      <div style={style}>{prev}</div>
    </S.Container>
  );
};

export default AwesomeTextTransiton;
