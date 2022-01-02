import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { color } from "../../style/color";
import { font } from "../../style/font";
import AwesomeTextTransiton from "../AwesomeTextTransiton/AwesomeTextTransiton";
import FadeOutCover from "../FadeOutCover/FadeOutCover";
import Plane from "../Main/Plane/Plane";
import DiceRender from "./DiceRender/DiceRender";
import DiceSide from "./DiceSide/DiceSide";
import * as S from "./styles";

const textStyle: React.CSSProperties = {
  font: font.headline3,
  color: color.black,
};

const Dice = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.lightBlue;
  }, []);

  const [isRolling, setIsRolling] = useState(true);
  const [diceValues, setDiceValues] = useState<number[]>([]);

  const addDiceValue = useCallback(
    (value: number) => {
      setDiceValues([value, ...diceValues]);
    },
    [diceValues]
  );

  useEffect(() => {
    console.log(diceValues);
  }, [diceValues]);

  const diceSidesGap = 16;
  const diceSideSize = 100;

  const renderDiceSides = useMemo(
    () =>
      diceValues.map((value, index) => (
        <DiceSide value={value} left={`calc(90% + ${(diceSidesGap + diceSideSize) * index}px)`} />
      )),
    [diceValues]
  );

  return (
    <S.Container>
      <Canvas
        mode="concurrent"
        shadows
        orthographic
        camera={{ position: [-25, 20, 25], zoom: 50, near: 1, far: 100 }}
      >
        <hemisphereLight intensity={1} />
        <spotLight
          position={[0, 20, 0]}
          angle={0.9}
          penumbra={1}
          intensity={1}
          castShadow
          color={color.lightBlue}
        />
        <ambientLight intensity={0.2} />
        <Physics iterations={15} gravity={[0, -30, 0]} allowSleep={false}>
          <Plane color={color.lightBlue} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <DiceRender isRollingState={[isRolling, setIsRolling]} addDiceValue={addDiceValue} />
        </Physics>
      </Canvas>
      <S.RollingContainer>
        <span style={textStyle}>Your Dice is&nbsp;</span>
        <AwesomeTextTransiton style={textStyle} text={isRolling ? "Rolling" : "Stoped"} />
      </S.RollingContainer>
      {renderDiceSides}
      <FadeOutCover color={color.lightBlue} />
    </S.Container>
  );
};

export default Dice;
