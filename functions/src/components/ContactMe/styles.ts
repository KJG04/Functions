import styled from "@emotion/styled";
import { color } from "../../style/color";

export const LightImg = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150vh;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-color: ${color.yellow};
`;

export const Dark1 = styled.div`
  position: absolute;
  width: 50vw;
  height: 100vh;
  top: 0px;
  right: 50%;
  background-color: ${color.darkGray};
`;

export const Dark2 = styled.div`
  position: absolute;
  width: 50vw;
  height: 100vh;
  top: 0px;
  left: 50%;
  background-color: ${color.darkGray};
`;
