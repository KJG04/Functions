import styled from "@emotion/styled";

export const LogoContainer = styled.div`
  width: 40px;
  position: absolute;
  top: 60px;
  left: 60px;
  cursor: none;
  user-select: none;
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
