import styled from "@emotion/styled";

export const Cover = styled.div<{ opacity: number; color: string }>`
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
