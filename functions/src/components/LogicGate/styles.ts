import styled from "@emotion/styled";
import { color } from "../Minesweeper";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const PathContainer = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${color.white};
  position: absolute;
  transform: translate(-50%, -50%);
`;
