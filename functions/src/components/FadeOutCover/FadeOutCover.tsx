import { useState, useEffect } from "react";
import * as S from "./styles";

interface PropsType {
  color: string;
}

const FadeOutCover = ({ color }: PropsType) => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
    }, 1000);
  }, []);

  return <S.Cover opacity={opacity} color={color} />;
};

export default FadeOutCover;
