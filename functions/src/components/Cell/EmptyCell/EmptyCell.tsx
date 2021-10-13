import { MouseEventHandler, useEffect, useState } from "react";
import { color } from "../../../style/color";
import * as S from "../styles";

type PropsType = {
  isOpen: boolean;
};

const EmptyCell = ({ isOpen }: PropsType): JSX.Element => {
  return <S.Cell isOpen={isOpen} color={color.black} />;
};

export default EmptyCell;
