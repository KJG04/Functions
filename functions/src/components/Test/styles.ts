import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";

export const getTransformStyle = (
  axisX: number,
  axisY: number,
  sign: number,
  isOpen: boolean
): string => {
  const deg = isOpen ? 180 * sign : 0;
  return `rotate3d(${axisX}, ${axisY}, 0, ${deg}deg)`;
};

export const Cell = styled.div<{
  bool: boolean;
  axisX: number;
  axisY: number;
  sign: number;
}>`
  width: 100px;
  height: 100px;
  background-color: white;
  transform: ${(props) => getTransformStyle(props.axisX, props.axisY, props.sign, props.bool)};
  transition: all 1s linear;
  transform-style: preserve-3d;
  perspective: 30px;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
