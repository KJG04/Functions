import { color } from "../../../style/color";
import * as S from "../styles";
type PropsType = {
  count: number;
};
const NumCell = ({ count }: PropsType): JSX.Element => {
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
  return (
    <S.Cell isOpen={false} color={colors[count - 1]}>
      {count}
    </S.Cell>
  );
};

export default NumCell;
