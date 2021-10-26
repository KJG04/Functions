import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "../styles";

interface PropsType {
  cellType: CellType;
  openCell: (point: Point) => void;
}

const EmptyCell = ({ cellType, openCell }: PropsType): JSX.Element => {
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
