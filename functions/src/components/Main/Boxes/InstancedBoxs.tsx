import { Triplet, useBox } from "@react-three/cannon";
import { useMemo } from "react";
import { Color } from "three";

interface SpheresPropsType {
  colorValue: string;
}

const InstancedBoxs = ({ colorValue }: SpheresPropsType) => {
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
};

export default InstancedBoxs;
