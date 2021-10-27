import { Direction } from ".";
import Point from "../Point";

export const EMPTY = "EMPTY";
export const MINE = "MINE";
export const NUMBER = "NUMBER";
export type CellTypeType = typeof EMPTY | typeof MINE | typeof NUMBER;

export default interface CellType {
  //셀의 정보를 담기 위한 객체의 타입
  point: Point;
  type: CellTypeType;
  mineCount: number;
  delay: number;
  direction: Direction;
  isFlag: boolean;
  isOpen: boolean;
}
