import { color } from "../../../style/color";
import * as S from "../styles";
import * as I from "./styles";

const MineCell = (): JSX.Element => {
  return (
    <S.Cell isOpen={false} color={color.black} opacity={""}>
      <I.Mine />
    </S.Cell>
  );
};

export default MineCell;
