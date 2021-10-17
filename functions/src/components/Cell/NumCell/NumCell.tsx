import { MutableRefObject } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "./styles";
type PropsType = {
  cellType: CellType;
  isOpenList: boolean[][];
  openNotEmptyCell: (point: Point) => void;
};

const colors = [
  color.darkBlue,
  color.green,
  color.red,
  color.purple,
  color.black,
  color.black,
  color.black,
  color.black,
];

const NumCell = ({
  cellType,
  isOpenList,
  openNotEmptyCell,
}: PropsType): JSX.Element => {
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };
  const numberCell = useRef<HTMLDivElement>(null);

  const { point, mineCount, delay, direction } = cellType;
  return (
    <S.CellContainer
      isOpen={isOpenList[point.y][point.x]}
      delay={delay}
      direction={direction}
    >
      <S.Cell
        direction={direction}
        ref={numberCell}
        delay={delay}
        isOpen={isOpenList[point.y][point.x]}
        // color={colors[count - 1]}
        color={color.white}
        opacity={isOpenList[point.y][point.x] ? "00" : ""}
        onClick={onClickHandler}
      >
        {mineCount}
      </S.Cell>
    </S.CellContainer>
  );
};

export default NumCell;
