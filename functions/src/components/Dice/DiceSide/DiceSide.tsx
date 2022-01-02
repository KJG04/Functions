import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./styles";

const center = "40%";
const top = "10%";
const bottom = "70%";
const right = "70%";
const left = "10%";

interface Position {
  vertical: string;
  horizontal: string;
}

const topLeft: Position = {
  vertical: top,
  horizontal: left,
};
const centerLeft: Position = {
  vertical: center,
  horizontal: left,
};
const bottomLeft: Position = {
  vertical: bottom,
  horizontal: left,
};
const centerCenter: Position = {
  vertical: center,
  horizontal: center,
};
const topRight: Position = {
  vertical: top,
  horizontal: right,
};
const centerRight: Position = {
  vertical: center,
  horizontal: right,
};
const bottomRight: Position = {
  vertical: bottom,
  horizontal: right,
};

const one: Position[] = [centerCenter];
const two: Position[] = [topLeft, bottomRight];
const three: Position[] = [topLeft, centerCenter, bottomRight];
const four: Position[] = [topLeft, bottomLeft, topRight, bottomRight];
const five: Position[] = [topLeft, bottomLeft, centerCenter, topRight, bottomRight];
const six: Position[] = [topLeft, centerLeft, bottomLeft, topRight, centerRight, bottomRight];
const numbers: Position[][] = [one, two, three, four, five, six];

interface PropsType {
  value: number;
  left: number;
  top: number;
}

const DiceSide = ({ value }: PropsType) => {
  const dots = useMemo(() => numbers[value - 1], [value]);
  const container = useRef<HTMLDivElement>(null);

  return (
    <S.Container ref={container}>
      {dots.map((value, index) => (
        <S.Dot key={index} {...value} />
      ))}
    </S.Container>
  );
};

export default DiceSide;
