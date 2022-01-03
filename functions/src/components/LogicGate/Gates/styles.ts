import styled from "@emotion/styled";

export const Container = styled.div<{ img: string }>`
  background: url(${(props) => props.img});
  width: 100px;
  height: 100px;
`;
