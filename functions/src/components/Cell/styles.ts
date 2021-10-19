import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Direction } from "../../module/Types";
import { color } from "../../style/color";
import { font } from "../../style/font";

export const CellStyle = css`
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${font.body1};
  user-select: none;
  cursor: pointer;
  transform-style: preserve-3d;
`;

export const getTransformStyle = (
  direction: Direction,
  isOpen: boolean
): string => {
  const { axisX, axisY, sign } = direction;
  const deg = isOpen ? -180 * sign : 0;
  return `perspective(300px) rotate3d(${axisX}, ${axisY}, 0, ${deg}deg)`;
};

export const getTransition = (delay: number): string => {
  return `transform 2s cubic-bezier(0.075, 0.82, 0.165, 1) ${delay}s, background-color 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) ${
    Math.round((delay + delay * 0.3) * 10) / 10
  }s`;
};

export const Cell = styled.div<{
  isOpen: boolean;
  color: string;
  opacity: string;
  delay: number;
  direction: Direction;
}>`
  ${CellStyle}
  background-color: ${color.white}${(props) => props.opacity};
  color: ${(props) => props.color};
  transform: ${(props) => getTransformStyle(props.direction, props.isOpen)};
  transition: ${(props) => getTransition(props.delay)};
`;
