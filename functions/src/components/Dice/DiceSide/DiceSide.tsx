import * as S from "./styles";

const center = "50%";
const top = "10%";
const bottom = "90%";
const right = "90%";
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

const DiceSide = () => {
  return <S.Container></S.Container>;
};

export default DiceSide;
