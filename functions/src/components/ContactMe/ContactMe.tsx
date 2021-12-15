import { useEffect } from "react";
import * as S from "./styles";
import { color } from "../../style/color";
import StickyNav from "../StickyNav/StickyNav";

const ContactMe = () => {
  useEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.darkGray;
  }, []);
  const EMAIL = "freedom7113@gmail.com";

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
    </>
  );
};

export default ContactMe;
