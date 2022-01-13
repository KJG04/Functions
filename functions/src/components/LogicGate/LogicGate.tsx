import { useLayoutEffect } from "react";
import { color } from "../Minesweeper";
import { ANDGate } from "./Gates";
import * as S from "./styles";

const LogicGate = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  const onDrag = () => {};

  return (
    <>
      <S.Container>
        <S.PathContainer>
          <path d="M10,55 C65,55 65,100 120,100" fill="none" stroke="#FFFFFF" stroke-width="3" />
        </S.PathContainer>
      </S.Container>
    </>
  );
};

export default LogicGate;
