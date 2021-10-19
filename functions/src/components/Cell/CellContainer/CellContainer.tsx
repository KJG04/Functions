import * as S from "./styles";

type PropType = {
  children: React.ReactNode;
};

const CellContainer = ({ children }: PropType): JSX.Element => {
  return (
    <>
      <S.Container
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </S.Container>
    </>
  );
};

export default CellContainer;
