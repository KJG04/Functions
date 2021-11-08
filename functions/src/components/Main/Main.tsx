import * as S from "./styles";

const Main = (): JSX.Element => {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.TitleContainerInner>
          <S.NoDecoLink to="/">
            <S.Title>Minesweeper</S.Title>
          </S.NoDecoLink>
          <S.NoDecoLink to="/">
            <S.Title>Logic Gate </S.Title>
          </S.NoDecoLink>
          <S.NoDecoLink to="/">
            <S.Title>Finding a way </S.Title>
          </S.NoDecoLink>
          <S.NoDecoLink to="/">
            <S.Title>Heap tree </S.Title>
          </S.NoDecoLink>
          <S.NoDecoLink to="/">
            <S.Title>Dice </S.Title>
          </S.NoDecoLink>
          <S.NoDecoLink to="/">
            <S.Title>Contact me</S.Title>
          </S.NoDecoLink>
        </S.TitleContainerInner>
      </S.TitleContainer>
    </S.Container>
  );
};

export default Main;
