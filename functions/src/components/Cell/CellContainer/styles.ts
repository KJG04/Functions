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

export const elastic = keyframes`
    0% {   transform: scale(0); },
    39% {  transform: scale(1.5047); },
    63% {  transform: scale(0.6937); },
    77% {  transform: scale(1.1854); },
    86% {  transform: scale(0.8884); },
    91% {  transform: scale(1.0667); },
    95% {  transform: scale(0.9608); },
    97% {  transform: scale(1.0225); },
    98% {  transform: scale(0.9877); },
    99% {  transform: scale(1.0061); },
    99% {  transform: scale(0.9977); },
    100% { transform: scale(1.0000); }
  `;

export const Flag = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${color.red};
`;
