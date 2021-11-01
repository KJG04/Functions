import {
  CellContainer,
  EmptyCell,
  MineCell,
  NumCell,
  Point,
  CellType,
  Direction,
  EMPTY,
  MINE,
  NUMBER,
  useLayoutEffect,
  useState,
  S,
  React,
} from ".";
import { CellPropsType } from "../../module/Types";
import { CellTypeType } from "../../module/Types/CellType";

const ROW = 17;
const COLUMN = 17;
const MINE_COUNT = 40;

const Minesweeper = (): JSX.Element => {
  const [cells, setCells] = useState<CellType[][]>([]); //셀의 정보를 담고있는 2차원 배열 state
  const [cannotControl, setCannotControl] = useState(false);

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
          isFlag: false,
          isOpen: false,
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

  const getSurroundMineCount = (point: Point, cellList: CellType[][]): number => {
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
    //기준(origin)에서 목표(to)로 방향을 리턴한다.
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
    //기준(origin)에서 목표(to)까지 거리를 계산해 특정 비율로 delay 값을 리턴한다.
    const offset = 0.12;
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
    //리셋하는 함수
    setCells(
      cells.map((item) => {
        return item.map((value) => {
          value.isOpen = false;
          return value;
        });
      })
    );
    init();
  };

  const changeAllOpenStateWithPoint = (point: Point, state: boolean) => {
    //매개변수로 받은 포인트를 기준으로 모든 셀을 연다
    setCells(
      cells.map((value, i) => {
        return value.map((v, j) => {
          const { isOpen } = v;
          if (!isOpen) {
            const p = new Point(j, i);
            v.direction = getDirection(point, p);
            v.delay = getDelay(point, p);
          }
          v.isOpen = state;
          return v;
        });
      })
    );
  };

  const getLeftMineCount = (): number => {
    var count = MINE_COUNT;

    cells.forEach((item) => {
      item.forEach((elem) => {
        if (elem.isFlag) {
          //종류가 깃발이 꼿혀있다면
          count--;
        }
      });
    });

    return count;
  };

  const openCell = (point: Point) => {
    //빈 셀을 눌렀을 때 실행되는 함수
    // 빈 셀을 눌렀을때는 주변의 빈셀을 다 열어야 한다.
    const { isOpen, isFlag } = cells[point.y][point.x];

    if (isOpen || isFlag) {
      //이미 셀이 열려있는 경우와 깃발이 꽃힌 경우
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
            cells[p.y][p.x].isOpen
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
      cells.map((value) => {
        return value.map((v) => {
          if (mustOpenCell.some((item) => item.equals(v.point))) {
            v.direction = getDirection(point, v.point);
            v.delay = getDelay(point, v.point);
            v.isOpen = true;
            v.isFlag = v.isFlag ? false : isFlag;
          }

          return v;
        });
      })
    );
  };

  const getOpenCell = (point: Point, isVisit: boolean[][], list: Point[]) => {
    //point를 기준으로 point와 point 주변의 열리지 않는 빈 셀을 list에 담아주는 함수
    const { x, y } = point;

    if (
      x < 0 ||
      x >= COLUMN ||
      y < 0 ||
      y >= ROW ||
      cells[y][x].isOpen ||
      cells[y][x].type !== EMPTY ||
      isVisit[y][x]
    ) {
      //포인트가 범위를 벗어났거나 이미 열려있거나 빈 셀이 아니리면
      return;
    }

    list.push(point);
    isVisit[y][x] = true;

    getOpenCell(new Point(x, y - 1), isVisit, list);
    getOpenCell(new Point(x + 1, y), isVisit, list);
    getOpenCell(new Point(x, y + 1), isVisit, list);
    getOpenCell(new Point(x - 1, y), isVisit, list);
  };

  const openNotEmptyCell = (point: Point) => {
    setCells(
      cells.map((value, i) => {
        return value.map((v, j) => {
          const { type, direction, isFlag } = v;

          if (isFlag) {
            //깃발이 꽃혀있으면 열지 않음
            return v;
          }

          if (type === MINE && point.equals(new Point(j, i))) {
            //만약 지뢰이면
            direction.axisX = 0;
            direction.axisY = 1;
            direction.sign = 1;
            v.delay = 0;
            setCannotControl(true);
            setTimeout(() => onMine(point), 1000);
          }

          if (new Point(j, i).equals(point)) v.isOpen = true;
          return v;
        });
      })
    );
  };

  const onMine = (point: Point) => {
    changeAllOpenStateWithPoint(point, true);
  };

  const getKey = (x: number, y: number): string => {
    return `${x.toString().padStart(2, "0")}${y.toString().padStart(2, "0")}`;
  };

  const cellRender = cells.map((elem) => {
    return elem.map((item) => {
      const { point, type } = item;
      const { x, y } = point;
      const cellMap = new Map<
        CellTypeType,
        ({ cellType, openCell: openNotEmptyCell }: CellPropsType) => JSX.Element
      >() //if문 대신 map을 사용했다
        .set(EMPTY, EmptyCell)
        .set(NUMBER, NumCell)
        .set(MINE, MineCell);

      const cell = React.createElement(cellMap.get(type)!, {
        key: getKey(x, y),
        cellType: item,
        openCell: type === EMPTY ? openCell : openNotEmptyCell,
      });

      return (
        <CellContainer cellsState={[cells, setCells]} cell={item} key={getKey(x, y)}>
          {cell}
        </CellContainer>
      );
    });
  });

  return (
    <S.Container>
      <S.InfoContainer>
        <S.InfoInner>남은 지뢰 수 : {getLeftMineCount()}</S.InfoInner>
      </S.InfoContainer>
      <S.CellContainer>
        <S.CellContainerInner row={ROW} column={COLUMN}>
          {cellRender}
          {cannotControl && <S.CoverPanel />}
        </S.CellContainerInner>
      </S.CellContainer>
    </S.Container>
  );
};

export default Minesweeper;
