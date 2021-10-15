import styled from "@emotion/styled";
import { color } from "../../style/color";
import { font } from "../../style/font";

export const Cell = styled.div<{
  isOpen: boolean;
  color: string;
  opacity: string;
}>`
  aspect-ratio: 1 / 1;
  width: 100%;
  background-color: ${color.lightGray}${(props) => props.opacity};
  border-radius: 8px;
  transform: rotateY(${(props) => (props.isOpen ? "180deg" : "0deg")});
  transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1),
    background-color 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  font: ${font.body1};
  user-select: none;
  cursor: pointer;
`;
