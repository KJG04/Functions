import { useState } from "react";
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
  const { point, direction, delay } = cellType;
  const [isClick, setIsClick] = useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };

  return (
    <I.Cell
      direction={direction}
      delay={delay}
      onClick={onClickHandler}
      isOpen={isOpenList[point.y][point.x]}
    >
      <I.Mine delay={delay} isOpen={isOpenList[point.y][point.x]} />
    </I.Cell>
  );
};

export default MineCell;
