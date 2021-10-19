import styled from "@emotion/styled";
import { Direction } from "../../../module/Types";
import { color } from "../../../style/color";
import { CellStyle, getTransformStyle, getTransition } from "../styles";

export const CellContainer = styled.div<{
  isOpen: boolean;
  delay: number;
  direction: Direction;
}>`
  position: relative;
  transform: ${(props) => getTransformStyle(props.direction, props.isOpen)};
  transition: ${(props) => getTransition(props.delay)};
`;

const reverseDirection = (direction: Direction): Direction => {
  return {
    axisX: -direction.axisX,
    axisY: -direction.axisY,
    sign: -direction.sign,
  };
};

export const Cell = styled.div<{
  isOpen: boolean;
  color: string;
  opacity: string;
  delay: number;
  direction: Direction;
}>`
  ${CellStyle};
  position: absolute;
  background-color: ${color.white}${(props) => props.opacity};
  transform: rotateY(180deg);
  color: ${(props) => props.color};
  transition: ${(props) => getTransition(props.delay)};
  transform: ${(props) =>
    getTransformStyle(reverseDirection(props.direction), props.isOpen)};
`;
