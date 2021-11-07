import { CellType, State } from "../../../module/Types";
import * as S from "./styles";
import gsap from "gsap";

type PropType = {
  children: React.ReactNode;
  cellsState: State<CellType[][]>;
  cell: CellType;
};

const CellContainer = ({ children, cell, cellsState }: PropType): JSX.Element => {
  const { point, isFlag, isOpen, delay } = cell;
  const [cells, setCells] = cellsState;

  const onContextMenukHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isOpen) {
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
          <S.Flag scale={isFlag ? 1 : 0} delay={delay} />
        </S.FlagContainer>
      </S.Container>
    </>
  );
};

export default CellContainer;
