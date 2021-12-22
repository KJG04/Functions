import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
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

  useFrame((e) => {
    const x = e.mouse.x * e.viewport.width;
    const y = (e.mouse.y * e.viewport.height) / 1.9 + -x / 3.5;

    cursorApi.position.set(x / 1.4, y, 0);
  });

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: boxSize.map((value) => value * sizeOffset) as Triplet,
    linearDamping: 0.9,
    angulardamping: 1.99,
    material: { friction: 1, restitution: 100 },
    position: [0, 0, 0],
  }));

  const bind = useDragConstraint(ref, api, cursorRef);

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
      <mesh ref={cursorRef}>
        <sphereBufferGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial fog={false} depthTest={false} transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export default DiceRender;
