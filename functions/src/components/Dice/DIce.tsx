import { Physics, useSphere } from "@react-three/cannon";
import { Canvas, useFrame } from "@react-three/fiber";
import { createRef, useLayoutEffect } from "react";
import { Object3D } from "three";
import { color } from "../../style/color";
import Plane from "../Main/Plane/Plane";
import DiceRender from "./DiceRender/DiceRender";
import * as S from "./styles";

const Dice = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.lightBlue;
  }, []);

  const cursor = createRef<Object3D>();

  const [cursorRef, cursorApi] = useSphere(
    () => ({
      type: "Static",
      args: [0.5],
      position: [0, 0, 10000],
      collisionFilterMask: 100,
    }),
    cursor
  );

  useFrame((e) => {
    const x = e.mouse.x * e.viewport.width;
    const y = (e.mouse.y * e.viewport.height) / 1.9 + -x / 3.5;

    cursorApi.position.set(x / 1.4, y, 0);
  });

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
          <DiceRender cursorRef={cursorRef} />
          <mesh ref={cursorRef}>
            <sphereBufferGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial fog={false} depthTest={false} transparent opacity={0.5} />
          </mesh>
        </Physics>
      </Canvas>
    </S.Container>
  );
};

export default Dice;
