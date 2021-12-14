import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color } from "../Minesweeper";

export const LogoContainer = styled.div`
  width: 40px;
  position: absolute;
  top: 60px;
  left: 60px;
  cursor: pointer;
  user-select: none;
  pointer-events: all;
`;

export const Logo = styled.img<{ isActive: boolean }>`
  width: 100%;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Circle = styled.div<{ scale: number }>`
  width: ${(props) => props.scale * 10}px;
  height: ${(props) => props.scale * 10}px;
  background-color: ${color.backgroundColor};
  top: 50%;
  left: 50%;
  position: absolute;
  border-radius: 50%;
  z-index: 100000;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: background-color 0.25s ease-out, width 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    height 1s cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
`;

export const GithubContainer = styled.a`
  text-decoration: none;
  position: relative;
  top: 0px;
  left: 0px;
  pointer-events: all;

  & div {
    :first-of-type {
      transform: translateY(50%);
    }
    :last-of-type {
      transform: translateY(-50%);
    }
  }
`;

export const GithubLink = styled.div<{ isActive: boolean }>`
  transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  display: flex;
  column-gap: 8px;
  position: relative;
  top: 0px;
  left: 0px;
`;

export const Github = styled.div`
  color: ${(props) => props.color};
  transform: none !important;
`;

export const GithubLogo = styled.img`
  width: 16px;
`;
