import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { color } from "../../Minesweeper";
import InstancedBoxs from "../Boxes/InstancedBoxs";
import Plane from "../Plane/Plane";
import * as S from "./styles";

interface PropsType {
  colorArray: string[];
}

const Back = ({ colorArray }: PropsType) => {
  return (
    <S.Container>
      <Canvas
        mode="concurrent"
        shadows
        gl={{ alpha: false }}
        camera={{ position: [0, -15, 15], fov: 50 }}
      >
        <hemisphereLight intensity={1} />
        <spotLight
          position={[-12, 8, 12]}
          angle={0.9}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <Physics gravity={[0, 0, -30]}>
          <Plane color={color.backgroundColor} />
          {colorArray.map((value) => (
            <InstancedBoxs colorValue={value} />
          ))}
        </Physics>
      </Canvas>
    </S.Container>
  );
};

export default Back;
