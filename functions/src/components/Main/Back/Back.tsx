import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { color } from "../../Minesweeper";
import InstancedBoxs from "../Boxes/InstancedBoxs";
import Plane from "../Plane/Plane";
import * as S from "./styles";
import { useEffect, useMemo, useState } from "react";
import BoxType from "../../../interface/BoxType";
import FadeOutCover from "../../FadeOutCover/FadeOutCover";

interface PropsType {
  boxArray: BoxType[];
}

const Back = ({ boxArray }: PropsType) => {
  const renderBoxes = useMemo(
    () => boxArray.map((value) => <InstancedBoxs colorValue={value.color} key={`${value.key}`} />),
    [boxArray]
  );

  return (
    <S.Container>
      <Canvas
        mode="concurrent"
        shadows
        gl={{ alpha: false }}
        camera={{ position: [0, -15, 15], fov: 50 }}
      >
        <hemisphereLight intensity={1} color={color.backgroundColor} />
        <spotLight
          position={[-12, 8, 12]}
          angle={0.9}
          penumbra={0.5}
          intensity={2}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <Physics gravity={[0, 0, -30]}>
          <Plane color={color.backgroundColor} />
          {renderBoxes}
        </Physics>
      </Canvas>
      <FadeOutCover color={color.backgroundColor} />
    </S.Container>
  );
};

export default Back;
