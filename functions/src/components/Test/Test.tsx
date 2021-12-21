import * as S from "./styles";
import StickyNav from "../StickyNav/StickyNav";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { color } from "../Minesweeper";
import DiceRender from "../Dice/DiceRender/DiceRender";
import Plane from "../Main/Plane/Plane";

const Test = () => {
  return (
    <S.Container>
      <Canvas
        mode="concurrent"
        shadows
        orthographic
        camera={{ position: [-25, 20, 25], zoom: 25, near: 1, far: 100 }}
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
        <Physics iterations={15} gravity={[0, -30, 0]} allowSleep={false}>
          <Plane
            color={color.backgroundColor}
            position={[0, -5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <DiceRender />
        </Physics>
      </Canvas>
    </S.Container>
  );
};

export default Test;
