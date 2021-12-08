import * as S from "./styles";
import { Color, Material } from "three";
import { useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";

import type { PlaneProps, Triplet } from "@react-three/cannon";
import type { MeshPhongMaterialProps } from "@react-three/fiber";
import { color } from "../Minesweeper";

type OurPlaneProps = Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation">;

function Plane({ color, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

const TransparentPlane = ({ ...props }: OurPlaneProps) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshPhongMaterial opacity={0} transparent={true} />
    </mesh>
  );
};

interface SpheresPropsType {
  colorValue: string;
}

function InstancedBoxs({ colorValue }: SpheresPropsType) {
  const boxSize: Triplet = [2, 2, 0.5];
  const length = 5;
  const zOffset = 12;
  const xOffset = -10;
  const [ref] = useBox((index) => ({
    args: boxSize,
    mass: 1,
    allowSleep: true,
    material: { restitution: 1, friction: 0.5 },
    position: [Math.random() - 0.5 + xOffset, Math.random() - 0.5, index * 2 + zOffset],
  }));

  const colors = useMemo(() => {
    const array = new Float32Array(length * 3);
    const color = new Color();
    for (let i = 0; i < 5; ++i) {
      color
        .set(colorValue)
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    }
    return array;
  }, [colorValue]);

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, length]}>
      <boxBufferGeometry args={boxSize}>
        <instancedBufferAttribute attachObject={["attributes", "color"]} args={[colors, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial vertexColors />
    </instancedMesh>
  );
}

const Test = () => {
  const [colorArray, setColorArray] = useState([color.green]);

  return (
    <S.Container onClick={() => setColorArray(colorArray.concat(color.red))}>
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

export default Test;
