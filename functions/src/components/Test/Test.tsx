import { useState } from "react";
import * as S from "./styles";
const Test = (): JSX.Element => {
  const [bool, setBool] = useState<boolean>(false);
  return (
    <>
      <S.Cell
        onClick={() => {
          setBool(!bool);
        }}
        bool={bool}
        axisX={1}
        axisY={1}
        sign={-1}
      />
    </>
  );
};

export default Test;
