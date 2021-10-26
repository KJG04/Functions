import { Direction } from ".";
import Point from "../Point";

export default interface CellType {
  //셀의 정보를 담기 위한 객체의 타입
  point: Point;
  type: string;
  mineCount: number;
  delay: number;
  direction: Direction;
  isFlag: boolean;
  isOpen: boolean;
}
