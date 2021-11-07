import styled from "@emotion/styled";
import { color } from "../../style/color";
import { font } from "../../style/font";

export const CellContainerInner = styled.div<{ row: number; column: number }>`
  display: grid;
  width: 100%;
  column-gap: 5px;
  row-gap: 5px;
  grid-template-columns: repeat(${(props) => props.column}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, 1fr);
  transform: perspective(300px);
`;

export const CellContainer = styled.div<{ canAnimate: boolean }>`
  display: flex;
  align-items: center;
  width: 800px;
  position: relative;
  div div {
    ${(props) => !props.canAnimate && "transition: none !important;"}
  }
`;

export const CoverPanel = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  transform: translateX(-150px);
  margin: 0 auto;
  width: 1100px;
  display: flex;
  color: ${color.white};
  height: 100vh;
`;

export const InfoContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  font: ${font.body3};
  padding: 28px;
  box-sizing: border-box;
`;

export const InfoInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  text-align: right;
`;

export const ReContainer = styled.div`
  display: flex;
  justify-content: right;
  text-align: left;
`;

export const ReInner = styled.div`
  cursor: pointer;
  user-select: none;
`;
