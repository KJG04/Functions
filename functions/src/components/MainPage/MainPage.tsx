import { useLayoutEffect, useState } from "react";
import EmptyCell from "../Cell/EmptyCell/EmptyCell";
import MineCell from "../Cell/MineCell/MineCell";
import NumCell from "../Cell/NumCell/NumCell";
import * as S from "./styles";

const MainPage = (): JSX.Element => {
  class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    equals(other: Point): boolean {
      return this.x === other.x && this.y === other.y;
    }
  }
  const EMPTY = "EMPTY";
  const MINE = "MINE";
  const NUMBER = "NUMBER";
  const ROW = 16;
  const COLUMN = 16;
  const MINE_COUNT = 40;

  type CellType = {
    point: Point;
    isOpen: boolean;
    type: string;
    object: JSX.Element;
  };

  const openEmptyCell = (point: Point): void => {
    cells[point.y][point.x].isOpen = true;
  };

  useLayoutEffect(() => {
    init();
  }, []);

  const [cells, setCells] = useState<CellType[][]>([]);
  //   useLayoutEffect(() => {
  //     cells.forEach((item) => {
  //       console.log(
  //         "" +
  //           item.map((value) => {
  //             if (value.type === MINE) return "■";
  //             else if (value.type === NUMBER) return "◆";
  //             else return "◎";
  //           })
  //       );
  //     });
  //   }, [cells]);

  const init = (): void => {
    const mineList: Point[] = [];

    while (mineList.length < MINE_COUNT) {
      //지뢰개수만큼 지뢰를 생성한다.
      const point: Point = getPoint(mineList);
      mineList.push(point);
    }

    const cellList: CellType[][] = [];
    for (let i = 0; i < ROW; i++) {
      //일단 빈 셀들을 생성한다.
      const cellRow: CellType[] = [];

      for (let j = 0; j < COLUMN; j++) {
        const point = new Point(j, i);
        const isMine = mineList.some((item) => point.equals(item));

        const cell: CellType = {
          point: point,
          isOpen: false,
          type: isMine ? MINE : EMPTY,
          object: isMine ? (
            <MineCell key={point.x * 10 + point.y} />
          ) : (
            <EmptyCell key={point.x * 10 + point.y} isOpen={false} />
          ),
        };
        cellRow.push(cell);
      }

      cellList.push(cellRow);
    }

    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COLUMN; j++) {
        const cell = cellList[i][j];

        if (cell.type === EMPTY) {
          const mineCount = getSurroundMineCount(new Point(j, i), cellList);
          if (mineCount > 0) {
            cell.type = NUMBER;
            cell.object = <NumCell count={mineCount} key={j * 10 + i} />;
          }
        }
      }
    }

    setCells([...cellList]);
  };

  const getSurroundMineCount = (
    point: Point,
    cellList: CellType[][]
  ): number => {
    //주변 지뢰의 개수를 구하는 함수
    let sum = 0;

    for (let i = -1; i < 2; ++i) {
      for (let j = -1; j < 2; ++j) {
        const p: Point = new Point(point.x + j, point.y + i);
        if (p.x < 0 || p.x >= COLUMN || p.y < 0 || p.y >= ROW) {
          continue;
        }

        if (cellList[p.y][p.x].type === MINE) {
          sum++;
        }
      }
    }
    return sum;
  };

  const getPoint = (mineList: Point[]): Point => {
    //중복되지 않는 위치값을 생성하는 함수
    const x: number = Math.floor(Math.random() * COLUMN);
    const y: number = Math.floor(Math.random() * ROW);

    const point: Point = new Point(x, y);

    if (mineList.some((item) => point.equals(item))) {
      //만약 지뢰의 위치가 이미 존재한다면
      const temp: Point = getPoint(mineList); //재귀함수를 통해 다시 생성한다.
      point.x = temp.x;
      point.y = temp.y;
    }

    return point;
  };

  return (
    <S.Container>
      {cells.map((item, i) => {
        return item.map((item) => {
          return item.object;
        });
      })}
    </S.Container>
  );
};

export default MainPage;
