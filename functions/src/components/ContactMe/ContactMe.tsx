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
          <StickyNav>
            <S.Title>freedom7113@gmail.com</S.Title>
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
    </>
  );
};

export default ContactMe;
