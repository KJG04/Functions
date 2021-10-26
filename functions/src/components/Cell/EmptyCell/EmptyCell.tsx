import { CellPropsType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "../styles";

const EmptyCell = ({ cellType, openCell }: CellPropsType): JSX.Element => {
  const { point, delay, direction, isOpen } = cellType;
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openCell(point);
    e.preventDefault();
  };

  return (
    <S.Cell
      onClick={onClickHandler}
      color={color.black}
      isOpen={isOpen}
      opacity={isOpen ? "00" : ""}
      delay={delay}
      direction={direction}
    />
  );
};

export default EmptyCell;
