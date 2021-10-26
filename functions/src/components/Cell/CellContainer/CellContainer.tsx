import { CellType, State } from "../../../module/Types";
import * as S from "./styles";
import { useRef } from "react";

type PropType = {
  children: React.ReactNode;
  cellsState: State<CellType[][]>;
  cell: CellType;
};

const CellContainer = ({
  children,
  cell,
  cellsState,
}: PropType): JSX.Element => {
  const { point, isFlag } = cell;
  const [cells, setCells] = cellsState;

  const flagRef = useRef<HTMLDivElement>(null);

  const onContextMenukHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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
