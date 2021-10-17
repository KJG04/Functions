import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "../styles";
type PropsType = {
  cellType: CellType;
  isOpenList: boolean[][];
  openCell: (point: Point) => void;
};
const EmptyCell = ({
  cellType,
  isOpenList,
  openCell,
}: PropsType): JSX.Element => {
  const { point, delay, direction } = cellType;
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openCell(point);
    e.preventDefault();
  };

  return (
    <S.Cell
      onClick={onClickHandler}
      color={color.black}
      isOpen={isOpenList[point.y][point.x]}
      opacity={isOpenList[point.y][point.x] ? "00" : ""}
      delay={delay}
      direction={direction}
    />
  );
};

export default EmptyCell;
