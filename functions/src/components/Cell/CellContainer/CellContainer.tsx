import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import * as S from "./styles";

type PropType = {
  children: React.ReactNode;
  cells: CellType[][];
  setCell: React.Dispatch<React.SetStateAction<CellType[][]>>;
  point: Point;
};

const CellContainer = ({
  children,
  cells,
  setCell,
  point,
}: PropType): JSX.Element => {
  return (
    <>
      <S.Container
        onContextMenu={(e) => {
          e.preventDefault();
          // setCell(
          //   cells.map((item, i) => {
          //     return item.map((value, j) => {
          //       if (value.point.equals(point)) {
          //         value.isFlag = true;
          //       }
          //       return value;
          //     });
          //   })
          // );
        }}
        onClick={(e) => {
          if (cells[point.y][point.x].isFlag) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </S.Container>
    </>
  );
};

export default CellContainer;
