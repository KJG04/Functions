import { useLayoutEffect, useState } from "react";
import Point from "../../module/Point";
import { CellType, Direction } from "../../module/Types";
import EmptyCell from "../Cell/EmptyCell/EmptyCell";
import MineCell from "../Cell/MineCell/MineCell";
import NumCell from "../Cell/NumCell/NumCell";
import * as S from "./styles";

const EMPTY = "EMPTY";
const MINE = "MINE";
const NUMBER = "NUMBER";
const ROW = 16;
const COLUMN = 16;
const MINE_COUNT = 40;

const MainPage = (): JSX.Element => {
  const initOpenList = (): boolean[][] => {
    //초기화 함수
    const openList: boolean[][] = [];

    for (let i = 0; i < ROW; i++) {
      const temp: boolean[] = [];

      for (let j = 0; j < COLUMN; j++) {
        temp.push(false);
      }
      openList.push(temp);
    }

    return openList;
  };

  const [cells, setCells] = useState<CellType[][]>([]); //셀의 정보를 담고있는 2차원 배열 state
  const [isOpenList, setIsOpenList] = useState<boolean[][]>(initOpenList()); //셀이 열려있는지 확인하는 boolean을 담고있는 2차원 배열

  const init = (): void => {
    //처음 초기화 함수
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
          type: isMine ? MINE : EMPTY,
          mineCount: 0,
          delay: 0,
          direction: {
            axisX: 0,
            axisY: 0,
            sign: 0,
          },
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
            cell.mineCount = mineCount;
          }
        }
      }
    }

    setCells([...cellList]);
  };

  useLayoutEffect(() => {
    console.log(
      "%cDon't cheatting!",
      `font-size: x-large; font-family: "Spoqa Han Sans Neo", "sans-serif"; `
    );
    init();
  }, []);

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

  const getDirection = (origin: Point, to: Point): Direction => {
    const dir: Direction = {
      axisX: 0,
      axisY: 0,
      sign: 1,
    };
    const x1 = origin.x,
      y1 = origin.y,
      x2 = to.x,
      y2 = to.y;

    if (x1 > x2) dir.axisY = 1;
    else if (x1 < x2) dir.axisY = -1;

    if (y1 > y2) dir.axisX = -1;
    else if (y1 < y2) dir.axisX = 1;

    return dir;
  };

  const getDelay = (origin: Point, to: Point): number => {
    const offset = 0.2;
    const x1 = origin.x,
      y1 = origin.y,
      x2 = to.x,
      y2 = to.y;

    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt(a * a + b * b);

    return c * offset;
  };

  const onReset = () => {
    setIsOpenList(initOpenList());
    init();
  };

  const openCell = (point: Point) => {
    //빈 셀을 눌렀을 때 실행되는 함수
    // 빈 셀을 눌렀을때는 주변의 빈셀을 다 열어야 한다.
    if (isOpenList[point.y][point.x]) {
      //이미 셀이 열려있는 경우
      return;
    }

    const isVisit: boolean[][] = []; //
    for (let i = 0; i < ROW; i++) {
      const temp: boolean[] = [];
      for (let j = 0; j < COLUMN; j++) {
        temp.push(false);
      }
      isVisit.push(temp);
    }
    let mustOpenCell: Point[] = []; //열어야하는 빈셀
    getOpenCell(point, isVisit, mustOpenCell);

    const additionalList: Point[] = []; //테두리를 열기위해 필요한 리스트

    mustOpenCell.forEach((item) => {
      for (let i = -1; i < 2; ++i) {
        for (let j = -1; j < 2; ++j) {
          const p = new Point(item.x + j, item.y + i);
          if (
            p.x < 0 ||
            p.x >= COLUMN ||
            p.y < 0 ||
            p.y >= ROW ||
            mustOpenCell.some((item) => item.equals(p)) ||
            isOpenList[p.y][p.x]
          ) {
            //범위 안에 있고 이미 열려야하는 셀에 있지 않은 경우
            continue;
          }
          additionalList.push(p);
        }
      }
    });

    mustOpenCell = mustOpenCell.concat(additionalList);
    setCells(
      cells.map((value, i) => {
        return value.map((v, j) => {
          if (mustOpenCell.some((item) => item.equals(v.point))) {
            v.direction = getDirection(point, v.point);
            v.delay = getDelay(point, v.point);
          }
          return v;
        });
      })
    );

    setIsOpenList(
      isOpenList.map((value, i) => {
        return value.map((v, j) => {
          if (mustOpenCell.some((item) => item.equals(new Point(j, i)))) {
            v = true;
          }
          return v;
        });
      })
    );
  };

  const getOpenCell = (point: Point, isVisit: boolean[][], list: Point[]) => {
    //point를 기준으로 point와 point 주변의 열리지 않는 빈 셀을 list에 담아주는 함수
    if (
      point.x < 0 ||
      point.x >= COLUMN ||
      point.y < 0 ||
      point.y >= ROW ||
      isOpenList[point.y][point.x] ||
      cells[point.y][point.x].type !== EMPTY ||
      isVisit[point.y][point.x]
    ) {
      //포인트가 범위를 벗어났거나 이미 열려있거나 빈 셀이 아니리면
      return;
    }

    list.push(point);
    isVisit[point.y][point.x] = true;

    getOpenCell(new Point(point.x, point.y - 1), isVisit, list);
    getOpenCell(new Point(point.x + 1, point.y), isVisit, list);
    getOpenCell(new Point(point.x, point.y + 1), isVisit, list);
    getOpenCell(new Point(point.x - 1, point.y), isVisit, list);
  };

  const openNotEmptyCell = (point: Point) => {
    setIsOpenList(
      isOpenList.map((value, i) => {
        return value.map((v, j) => {
          if (new Point(j, i).equals(point)) v = true;
          return v;
        });
      })
    );
  };

  return (
    <S.Container>
      {cells.map((item, i) => {
        return item.map((item) => {
          if (item.type === EMPTY)
            return (
              <EmptyCell
                key={item.point.x * 10 + item.point.y}
                cellType={item}
                isOpenList={isOpenList}
                openCell={openCell}
              />
            );
          else if (item.type === NUMBER)
            return (
              <NumCell
                cellType={item}
                isOpenList={isOpenList}
                openNotEmptyCell={openNotEmptyCell}
                key={item.point.x * 10 + item.point.y}
              />
            );
          else if (item.type === MINE)
            return (
              <MineCell
                cellType={item}
                isOpenList={isOpenList}
                openNotEmptyCell={openNotEmptyCell}
                key={item.point.x * 10 + item.point.y}
              />
            );
        });
      })}
    </S.Container>
  );
};

export default MainPage;
