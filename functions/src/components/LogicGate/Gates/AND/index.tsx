import * as S from "../styles";
import ANDBody from "../../../../assets/LogicGateBodies/AND.svg";
import { FC } from "react";
import { Gate } from "../../../../context/GateContext";

const ANDGate: FC<Gate & { index: number }> = ({ position, index }) => {
  const [x, y] = position;

  return (
    <S.Container style={{ top: `${x}px`, left: `${y}px` }} img={ANDBody}>
      <S.Dot style={{ top: "15%" }} />
      <S.Dot style={{ top: "85%" }} />
      <S.Dot style={{ top: "50%", left: "100%" }} />
    </S.Container>
  );
};

export default ANDGate;
