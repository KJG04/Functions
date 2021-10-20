import Point from "../../../module/Point";
import { CellType } from "../../../module/Types";
import { color } from "../../../style/color";
import * as I from "./styles";

type PropsType = {
  cellType: CellType;
  openNotEmptyCell: (point: Point) => void;
};

const MineCell = ({ cellType, openNotEmptyCell }: PropsType): JSX.Element => {
  const { point, isOpen } = cellType;

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };

  return (
    <I.Cell onClick={onClickHandler} isOpen={isOpen}>
      <I.Mine isOpen={isOpen} />
    </I.Cell>
  );
};

export default MineCell;
