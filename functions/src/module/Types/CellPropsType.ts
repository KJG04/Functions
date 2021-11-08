import { CellType } from ".";
import Point from "../Point";

export default interface PropsType {
  cellType: CellType;
  openCell: (point: Point) => void;
}
