import styled from "@emotion/styled";
import { Direction } from "../../../module/Types";
import { color } from "../../../style/color";
import { CellStyle, getTransformStyle, getTransition } from "../styles";

export const Mine = styled.div<{ isOpen: boolean; delay: number }>`
  width: 16px;
  height: 16px;
  background-color: ${(props) => (props.isOpen ? color.darkGray : color.white)};
  transition: background-color 2s cubic-bezier(0.075, 0.82, 0.165, 1)
    ${(props) => 0.4 + props.delay}s;
  border-radius: 50%;
`;

export const Cell = styled.div<{
  isOpen: boolean;
  delay: number;
  direction: Direction;
}>`
  ${CellStyle};
  background-color: ${color.white};
  transform: ${(props) => getTransformStyle(props.direction, props.isOpen)};
  transition: ${(props) => getTransition(props.delay)};
`;
