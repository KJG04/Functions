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
