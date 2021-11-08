import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color } from "../Minesweeper";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 72px;
  color: ${color.black};
  text-align: right;
  user-select: none;
`;

export const TitleContainer = styled.div`
  padding: 48px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: right;
  display: flex;
  box-sizing: border-box;
`;

export const TitleContainerInner = styled.div`
  display: flex;
  row-gap: 24px;
  flex-direction: column;
`;

export const NoDecoLink = styled(Link)`
  text-decoration: none;
`;
