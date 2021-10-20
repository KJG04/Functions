import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import * as S from "./styles";

type PropType = {
  children: React.ReactNode;
  cells: CellType[][];
  cell: CellType;
  setCells: React.Dispatch<React.SetStateAction<CellType[][]>>;
};

const CellContainer = ({
  children,
  cells,
  cell,
  setCells,
}: PropType): JSX.Element => {
  const { point } = cell;

  const onContextMenukHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setCells(
      cells.map((item) => {
        return item.map((value) => {
          if (value.point.equals(point)) {
            value.isFlag = true;
          }
          return value;
        });
      })
    );
  };

  return (
    <>
      <S.Container onContextMenu={onContextMenukHandler}>
        {children}
      </S.Container>
    </>
  );
};

export default CellContainer;
