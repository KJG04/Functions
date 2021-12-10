import styled from "@emotion/styled";
import { color } from "../Minesweeper";

export const LogoContainer = styled.div`
  width: 40px;
  position: absolute;
  top: 60px;
  left: 60px;
  cursor: pointer;
  user-select: none;
`;

export const Logo = styled.img<{ isActive: boolean }>`
  width: 100%;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Circle = styled.div<{ scale: number }>`
  width: ${(props) => props.scale * 10}px;
  height: ${(props) => props.scale * 10}px;
  background-color: ${color.backgroundColor};
  top: 50%;
  left: 50%;
  position: absolute;
  border-radius: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  transition: background-color 0.25s ease-out, width 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    height 1s cubic-bezier(0.075, 0.82, 0.165, 1);
`;
