import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color } from "../Minesweeper";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 72px;
  color: ${color.black};
  text-align: right;
  user-select: none;
  transition: transform 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transform: translateX(-20%);
  }
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
  outline: none;
  cursor: none !important;
`;
