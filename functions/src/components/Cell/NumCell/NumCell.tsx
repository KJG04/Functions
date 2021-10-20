import { MutableRefObject } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as S from "./styles";
type PropsType = {
  cellType: CellType;
  openNotEmptyCell: (point: Point) => void;
};

const NumCell = ({ cellType, openNotEmptyCell }: PropsType): JSX.Element => {
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
