import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { createRef } from "react";
import { Object3D } from "three";
import useDragConstraint from "../../../hooks/useDragConstraint";
import { color } from "../../Minesweeper";

const DiceRender = () => {
  const boxSize: Triplet = [1, 1, 1];
  const cursor = createRef<Object3D>();

  const [cursorRef, cursorApi] = useSphere(
    () => ({
      type: "Static",
      args: [0.5],
      position: [0, 0, 10000],
    }),
    cursor
  );

  useFrame((e) => {
    const x = e.mouse.x * e.viewport.width;
    const y = e.mouse.y * e.viewport.height;

    cursorApi.position.set(x, y, 0);
  });

  const [ref] = useBox(() => ({
    mass: 1,
    args: boxSize,
    linearDamping: 0.9,
    angulardamping: 1.99,
    position: [0, 0, 16],
  }));

  const bind = useDragConstraint(ref, cursorRef);

  return (
    <>
      <mesh ref={ref} castShadow receiveShadow {...bind}>
        <boxBufferGeometry attach="geometry" args={boxSize} />
        <meshLambertMaterial attach="material" color={color.white} />
      </mesh>
      <mesh ref={cursorRef}>
        <sphereBufferGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial fog={false} depthTest={false} transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export default DiceRender;
