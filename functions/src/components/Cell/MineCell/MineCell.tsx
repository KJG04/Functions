import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as I from "./styles";

type PropsType = {
  cellType: CellType;
  isOpenList: boolean[][];
  openNotEmptyCell: (point: Point) => void;
};

const MineCell = ({
  cellType,
  isOpenList,
  openNotEmptyCell,
}: PropsType): JSX.Element => {

  const { point } = cellType;

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };

  return (
    <I.Cell onClick={onClickHandler} isOpen={isOpenList[point.y][point.x]}>
      <I.Mine isOpen={isOpenList[point.y][point.x]} />
    </I.Cell>
  );
};

export default MineCell;
