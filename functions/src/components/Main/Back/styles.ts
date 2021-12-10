import styled from "@emotion/styled";
import { color } from "../../Minesweeper";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const Cover = styled.div<{ opacity: number }>`
  background-color: ${color.backgroundColor};
  opacity: ${(props) => props.opacity};
  transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
