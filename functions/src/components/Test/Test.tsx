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
          <DiceRender />
        </Physics>
      </Canvas>
    </S.Container>
  );
};

export default Test;
