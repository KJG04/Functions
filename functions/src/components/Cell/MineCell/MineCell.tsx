import { CellPropsType } from "../../../module/Types";
import * as I from "./styles";

const MineCell = ({
  cellType,
  openCell: openNotEmptyCell,
}: CellPropsType): JSX.Element => {
  const { point, delay, direction, isOpen } = cellType;

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    openNotEmptyCell(point);
    e.preventDefault();
  };

  return (
    <I.Cell
      onClick={onClickHandler}
      isOpen={isOpen}
      delay={delay}
      direction={direction}
    >
      <I.Mine isOpen={isOpen} delay={delay} />
    </I.Cell>
  );
};

export default MineCell;
