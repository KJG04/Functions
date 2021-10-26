import { CellPropsType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "./styles";

const NumCell = ({
  cellType,
  openCell: openNotEmptyCell,
}: CellPropsType): JSX.Element => {
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };

  const { point, mineCount, delay, direction, isOpen } = cellType;
  return (
    <S.CellContainer isOpen={isOpen} delay={delay} direction={direction}>
      <S.Cell
        direction={direction}
        delay={delay}
        isOpen={isOpen}
        color={color.white}
        opacity={isOpen ? "00" : ""}
        onClick={onClickHandler}
      >
        {mineCount}
      </S.Cell>
    </S.CellContainer>
  );
};

export default NumCell;
