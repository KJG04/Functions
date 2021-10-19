import styled from "@emotion/styled";
import { Direction } from "../../../module/Types";
import { color } from "../../../style/color";
import { CellStyle } from "../styles";

export const Mine = styled.div<{ isOpen: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${(props) => (props.isOpen ? color.darkGray : color.white)};
  transition: background-color 2s cubic-bezier(0.075, 0.82, 0.165, 1) 0.4s;
  border-radius: 50%;
`;

export const Cell = styled.div<{ isOpen: boolean }>`
  ${CellStyle};
  background-color: ${color.white};
  transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: rotateY(${(props) => (props.isOpen ? 180 : 0)}deg);
`;
