import * as S from "../styles";
import ANDBody from "../../../../assets/LogicGateBodies/AND.svg";
import { FC, useEffect, useMemo, useRef } from "react";
import { Dot, Gate } from "../../../../context/GateContext";
import useGateContext from "../../../../hooks/useGateConext";
import uniqueId from "../../../../constance/UniqueId";

const ANDGate: FC<Gate & { index: number }> = ({ position, index }) => {
  const [x, y] = position;
  const { gates } = useGateContext();
  const currentGate = useMemo(() => gates[index], [gates, index]);

  const input1Ref = useRef<HTMLDivElement>(null);
  const input2Ref = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input1Ref.current && input2Ref.current && outputRef.current) {
      const copyGates = [...gates];

      const { input1, input2, output } = currentGate;
      const dots = [input1, input2, output];
      const names = ["input1", "input2", "output"];
      const refs = [input1Ref.current, input2Ref.current, outputRef.current];

      dots.forEach((value, i) => {
        const id = value ? value.id : uniqueId();

        const name = names[i] as "input1" | "input2" | "output";

        const { left, top, height, width } = refs[i].getBoundingClientRect();

        copyGates[index][name] = {
          id: id,
          connectNode: null,
          position: [left + width / 2, top + height / 2],
        };
      });
    }
  }, [currentGate, gates, index]);

  return (
    <S.Container style={{ top: `${x}px`, left: `${y}px` }} img={ANDBody}>
      <S.Dot ref={input1Ref} style={{ top: "15%" }} />
      <S.Dot ref={input2Ref} style={{ top: "85%" }} />
      <S.Dot ref={outputRef} style={{ top: "50%", left: "100%" }} />
    </S.Container>
  );
};

export default ANDGate;
