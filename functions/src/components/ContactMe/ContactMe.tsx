import { useEffect } from "react";
import * as S from "./styles";
import { color } from "../../style/color";

const ContactMe = () => {
  useEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.darkGray;
  }, []);

  return (
    <S.Container>
      <S.Dark1 />
      <S.Dark2 />
    </S.Container>
  );
};

export default ContactMe;
