import Point from "../../../module/Point";
import { color } from "../../../style/color";
import * as S from "../styles";
type PropsType = {
  count: number;
  point: Point;
  isOpenList: boolean[][];
  setIsOpenList: React.Dispatch<React.SetStateAction<boolean[][]>>;
};

const colors = [
  color.darkBlue,
  color.green,
  color.red,
  color.purple,
  color.black,
  color.black,
  color.black,
  color.black,
];

const NumCell = ({
  count,
  point,
  isOpenList,
  setIsOpenList,
}: PropsType): JSX.Element => {
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpenList(
      isOpenList.map((value, i) => {
        return value.map((v, j) => {
          if (new Point(j, i).equals(point)) v = true;
          return v;
        });
      })
    );
    e.preventDefault();
  };

  return (
    <S.Cell
      isOpen={isOpenList[point.y][point.x]}
      color={colors[count - 1]}
      opacity={isOpenList[point.y][point.x] ? "00" : ""}
      onClick={onClickHandler}
    >
      {count}
    </S.Cell>
  );
};

export default NumCell;
