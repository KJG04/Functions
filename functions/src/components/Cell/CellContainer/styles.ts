import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { color } from "../../../style/color";

export const Container = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  position: relative;
`;

export const FlagContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flag = styled.div<{ delay: number }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${color.yellow};
  transform: scale(0);
`;
