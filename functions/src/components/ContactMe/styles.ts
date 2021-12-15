import styled from "@emotion/styled";
import { color } from "../../style/color";
import { font } from "../../style/font";

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

const Dark = styled.div`
  position: absolute;
  width: 50vw;
  height: 200vh;
  top: -10vh;
  background-color: ${color.darkGray};
`;

export const Dark1 = styled(Dark)`
  right: 50%;
  transform-origin: right top;
`;

export const Dark2 = styled(Dark)`
  transform-origin: left top;
  left: 50%;
`;

export const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const Title = styled.div`
  font: ${font.headline1};
  color: ${color.black};
  text-decoration: underline;
  cursor: pointer;
`;

export const Subtitle = styled.div`
  font: ${font.headline3};
  color: ${color.black};
`;

export const TitleLink = styled.a`
  font: ${font.headline1};
  color: ${color.black};
  text-decoration: underline;
`;
