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
          <DiceRender />
        </Physics>
      </Canvas>
    </S.Container>
  );
};

export default Test;
