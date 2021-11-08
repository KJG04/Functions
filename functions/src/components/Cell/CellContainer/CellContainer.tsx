import { CellType, State } from "../../../module/Types";
import * as S from "./styles";
import gsap from "gsap";
import { useRef, useLayoutEffect, useState } from "react";

type PropType = {
  children: React.ReactNode;
  cellsState: State<CellType[][]>;
  cell: CellType;
};

const CellContainer = ({ children, cell, cellsState }: PropType): JSX.Element => {
  const { point, isFlag, isOpen, delay } = cell;
  const [flagState, setFlagState] = useState<boolean>(isFlag);

  const [cells, setCells] = cellsState;
  const mine = useRef<HTMLDivElement>(null);

  const onContextMenuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isOpen) {
      setCells(
        cells.map((item) => {
          return item.map((value) => {
            if (value.point.equals(point)) {
              value.isFlag = !isFlag;
            }
            return value;
          });
        })
      );
    }
  };

  useLayoutEffect(() => {
    const { x, y } = point;

    if (cells[y][x].isFlag !== flagState) {
      //만약 나의 플래그 값이 바뀌었으면
      gsap.to(mine.current, {
        scale: isFlag ? 1 : 0,
        ease: "elastic.out(1, 0.5)",
        duration: 1.5,
        delay: delay,
      });
      setFlagState(isFlag);
    }
  }, [cells]);

  return (
    <>
      <S.Container onContextMenu={onContextMenuHandler}>
        {children}
        <S.FlagContainer>
          <S.Flag ref={mine} delay={delay} />
        </S.FlagContainer>
      </S.Container>
    </>
  );
};

export default CellContainer;
