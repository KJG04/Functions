import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export const RollingContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 10%;
  left: 50%;
  display: flex;
`;

export const DiceSideContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 90%;
  display: flex;
  column-gap: 16px;
`;

export const Refresh = styled.img`
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 2.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transform: translate(-50%, -50%) scale(2) rotate(-360deg);
    opacity: 1;
  }
`;
