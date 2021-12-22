import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useDragConstraint from "../../../hooks/useDragConstraint";
import { color } from "../../Minesweeper";

const DiceRender = () => {
  const boxSize: Triplet = [1, 1, 1];
  const sizeOffset = 2;
  const circleArgs: [number, number] = [1 * 0.1, 100];
  const [cursorRef, cursorApi] = useSphere(() => ({
    type: "Static",
    args: [0.5],
    position: [0, 0, 10000],
    collisionFilterMask: 100,
  }));

  const angularVelocity = useRef<Triplet>([0, 0, 0]);
  const velocity = useRef<Triplet>([0, 0, 0]);

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: boxSize.map((value) => value * sizeOffset) as Triplet,
    linearDamping: 0.9,
    angulardamping: 1.99,
    position: [0, 0, 0],
  }));

  const bind = useDragConstraint(ref, api, cursorRef);

  useFrame((e) => {
    const x = e.mouse.x * e.viewport.width;
    const y = (e.mouse.y * e.viewport.height) / 1.9 + -x / 3.5;

    cursorApi.position.set(x / 1.4, y, 0);
  });

  useEffect(() => {
    //각속도값과 이동속도값을 가지기 위해 subscribe를 통해 가져온다.
    const unsubscribeAngularVelocity = api.angularVelocity.subscribe((v) => {
      angularVelocity.current = v;
    });
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      velocity.current = v;
    });

    return () => {
      //dice가 없어지면 속도값을 구할 필요가 없기 때문에 unsubscribe한다.
      unsubscribeAngularVelocity();
      unsubscribeVelocity();
    };
  }, []);

  return (
    <>
      <group ref={ref} scale={new Vector3(sizeOffset, sizeOffset, sizeOffset)}>
        <mesh castShadow receiveShadow {...bind}>
          <boxBufferGeometry attach="geometry" />
          <meshLambertMaterial attach="material" color={color.white} />
        </mesh>

        {/* 1 */}
        <group position={[0, 0, 0.51]}>
          <mesh>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 6 */}
        <group position={[0, 0, -0.51]} rotation={[Math.PI, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 3 */}
        <group position={[0, 0.51, 0]} rotation={[Math.PI / -2, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 4 */}
        <group position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 2 */}
        <group position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 5 */}
        <group position={[-0.51, 0, 0]} rotation={[0, Math.PI / -2, 0]}>
          <mesh>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>
      </group>
      <mesh ref={cursorRef} />
    </>
  );
};

export default DiceRender;
