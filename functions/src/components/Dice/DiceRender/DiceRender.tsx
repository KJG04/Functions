import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { createRef } from "react";
import { Event, Object3D } from "three";
import useDragConstraint from "../../../hooks/useDragConstraint";
import { color } from "../../Minesweeper";

interface PropsType {
  cursorRef: React.RefObject<Object3D<Event>>;
}

const DiceRender = ({ cursorRef }: PropsType) => {
  const boxSize: Triplet = [1, 1, 1];

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: boxSize,
    linearDamping: 0.9,
    angulardamping: 1.99,
    position: [0, 0, 0],
  }));

  const bind = useDragConstraint(ref, api, cursorRef);

  return (
    <>
      <mesh ref={ref} castShadow receiveShadow {...bind}>
        <boxBufferGeometry attach="geometry" args={boxSize} />
        <meshLambertMaterial attach="material" color={color.white} />
      </mesh>
    </>
  );
};

export default DiceRender;
