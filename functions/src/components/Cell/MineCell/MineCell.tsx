import { CellPropsType } from "../../../module/Types";
import * as I from "./styles";

const MineCell = ({
  cellType,
  openCell: openNotEmptyCell,
}: CellPropsType): JSX.Element => {
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
