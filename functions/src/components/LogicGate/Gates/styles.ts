import styled from "@emotion/styled";
import { color } from "../../Minesweeper";

export const Container = styled.div<{ img: string }>`
  background: url(${(props) => props.img});
  width: 100px;
  height: 100px;
  position: relative;
`;

export const Dot = styled.div`
  border-radius: 50%;
  background-color: ${color.darkGray};
  width: 20%;
  height: 20%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
