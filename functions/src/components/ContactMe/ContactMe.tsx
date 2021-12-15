import { useEffect } from "react";
import * as S from "./styles";
import { color } from "../../style/color";

const ContactMe = () => {
  useEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.darkGray;
  }, []);

  return (
    <>
      <S.Container>
        <S.Dark1 />
        <S.Dark2 />
      </S.Container>
      <S.CenterContainer>
        <S.ContentContainer>
          <S.Subtitle>email</S.Subtitle>
          <S.Title>freedom7113@gmail.com</S.Title>
        </S.ContentContainer>
        <S.ContentContainer>
          <S.Subtitle>github</S.Subtitle>
          <S.Title>https://github.com/KJG04</S.Title>
        </S.ContentContainer>
      </S.CenterContainer>
    </>
  );
};

export default ContactMe;
