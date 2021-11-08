import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  cursor: none !important;
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

export const Cursor = styled.div<{ scale: number }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  transition: background-color 0.25s ease-out, left 1s cubic-bezier(0.075, 0.82, 0.165, 1),
    top 1s cubic-bezier(0.075, 0.82, 0.165, 1), transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: scale(${(props) => props.scale});
  position: absolute;
  border-radius: 50%;
`;
