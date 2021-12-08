import styled from "@emotion/styled";
import { color } from "../../Minesweeper";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  cursor: none !important;
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

export const Cursor = styled.div<{ scale: number }>`
  width: ${(props) => props.scale * 10}px;
  height: ${(props) => props.scale * 10}px;
  background-color: ${(props) => props.color};
  transition: background-color 0.25s ease-out, width 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    height 1s cubic-bezier(0.075, 0.82, 0.165, 1), left 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
`;