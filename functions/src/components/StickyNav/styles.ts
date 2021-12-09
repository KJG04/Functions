import styled from "@emotion/styled";
import { font } from "../../style/font";

export const Text = styled.div`
  transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  font: ${font.headline1};
  cursor: default;
`;

export const Container = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
