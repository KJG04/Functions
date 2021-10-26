import { CellType } from "../../../module/Types";
import * as S from "./styles";
import { useRef } from "react";

type PropType = {
  children: React.ReactNode;
  cells: CellType[][];
  cell: CellType;
  setCells: React.Dispatch<React.SetStateAction<CellType[][]>>;
};

const CellContainer = ({ children, cells, cell, setCells }: PropType): JSX.Element => {
  const { point, isFlag } = cell;

  const flagRef = useRef<HTMLDivElement>(null);

  const onContextMenukHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!cell.isOpen) {
      setCells(
        cells.map((item) => {
          return item.map((value) => {
            if (value.point.equals(point)) {
              value.isFlag = !isFlag;
            }
            return value;
          });
        })
      );
    }
  };

  return (
    <>
      <S.Container onContextMenu={onContextMenukHandler}>
        {children}
        <S.FlagContainer>
          <S.Flag ref={flagRef} />
        </S.FlagContainer>
      </S.Container>
    </>
  );
};

export default CellContainer;
