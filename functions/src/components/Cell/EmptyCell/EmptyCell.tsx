import Point from "../../../module/Point";
import { color } from "../../../style/color";
import * as S from "../styles";
type CellType = {
  point: Point;
  isOpenList: boolean[][];
  openCell: (point: Point) => void;
};
const EmptyCell = ({ point, isOpenList, openCell }: CellType): JSX.Element => {
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
    />
  );
};

export default EmptyCell;
