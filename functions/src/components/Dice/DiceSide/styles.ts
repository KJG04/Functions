import styled from "@emotion/styled";
import { color } from "../../Minesweeper";

export const Container = styled.div<{ left: string }>`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${color.white};
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${(props) => props.left};
  bottom: 10%;
`;

export const Dot = styled.div<{ vertical: string; horizontal: string }>`
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background-color: ${color.black};
  position: absolute;
  top: ${(props) => props.vertical};
  left: ${(props) => props.horizontal};
`;
